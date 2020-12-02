package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.boundry.exceptions.UnauthorizedOperationException;
import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.BoardRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.BoardServiceInterface;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardServiceImp implements BoardServiceInterface {

    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;
    private final UserService userService;

    public BoardServiceImp(BoardRepository boardRepository, ModelMapper modelMapper, UserRepository userRepository, PhotoRepository photoRepository, UserService userService) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.photoRepository = photoRepository;
        this.userService = userService;
    }

    @Override
    public Long addBoard(WriteBoardDTO newBoard,  Long loggedUserId){
        Board board = modelMapper.map(newBoard, Board.class);
        User user = userService.findById(loggedUserId);
        board.setUser(user);
        try{
            Board savedBoard = boardRepository.saveAndFlush(board);
            return savedBoard.getBoardId();
        }
        catch (org.springframework.dao.DataIntegrityViolationException dataIntegrityViolationException) {
            throw new DataIntegrityViolationException("This user has already a board with this title!");
        }
        catch (Exception e)
        {
            throw new ServerErrorException("Couldn't save board!");
        }
    }

    @Override
    public void deleteBoard(Long boardId, Long userId) {
        User user = userService.findById(userId);
        Board board = findBoardById(boardId);
        if (board.getUser() != user)
            throw new UnauthorizedOperationException("You can't delete someone else's board!");
        boardRepository.delete(board);
    }

    @Override
    public List<ReadUserBoard> getUserBoards(String username, Boolean isLoggedUser) {
        Boolean isPresent = userRepository.existsByUsername(username);
        if(!isPresent)
            throw new NotFoundException("User not found!");
        List<Board> boards;
        if(!isLoggedUser)
            boards = boardRepository.getPublicBoards(username);
        else
            boards = boardRepository.getUserBoards(username);
        return boards.stream().map((board -> {
            ReadUserBoard readUserBoard = modelMapper.map(board, ReadUserBoard.class);
            readUserBoard.setNumberOfPictures(photoRepository.countByBoardsContains(board));
            Photo firstPhoto = photoRepository.getFirstByBoardsContains(board);
            if(firstPhoto != null)
                readUserBoard.setFirstPicture(PhotoServiceImpl.getPhotoFromFile(firstPhoto.getPath()));
            else
                readUserBoard.setFirstPicture(new byte[]{});
            return readUserBoard;
        })).collect(Collectors.toList());
    }

    @Override
    public Boolean addPhotoToBoard(Long boardId, Long photoId,  Long loggedUserId) {
        Board board = findBoardById(boardId);
        if(!userRepository.existsByUserIdAndBoardsContains(loggedUserId, board))
            throw new UnauthorizedOperationException("Can't add photo to this board because is not yours!");
        Optional<Photo> photo = photoRepository.findById(photoId);
        if(!photo.isPresent())
            throw new NotFoundException("Photo not found!");
        if(boardRepository.existsByPhotosContainsAndBoardId(photo.get(), boardId))
            return false;
        board.addPhoto(photo.get());
        boardRepository.flush();
        return true;
    }

    @Override
    public void deletePhotoFromBoard(Long boardId, Long photoId, Long loggedUserId) {
        Board board = findBoardById(boardId);
        if(!userRepository.existsByUserIdAndBoardsContains(loggedUserId, board))
            throw new UnauthorizedOperationException("Can't remove photo from this board because is not yours!");
        Optional<Photo> photo = photoRepository.findById(photoId);
        if(!photo.isPresent())
            throw new NotFoundException("Photo not found!");
        board.deletePhoto(photo.get());
        boardRepository.flush();
    }

    @Override
    public Board findBoardById(Long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(!board.isPresent())
            throw new NotFoundException("Board not found!");
        return board.get();
    }
}
