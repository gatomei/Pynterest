package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.BoardRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.BoardServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardServiceImp implements BoardServiceInterface {


    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;

    public BoardServiceImp(BoardRepository boardRepository, ModelMapper modelMapper, UserRepository userRepository, PhotoRepository photoRepository) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.photoRepository = photoRepository;
    }

    @Override
    public Long addBoard(WriteBoardDTO newBoard){
        Board board = modelMapper.map(newBoard, Board.class);
        Optional<User> user = userRepository.findById(newBoard.getUserId());
        if(!user.isPresent())
            throw new DataIntegrityViolationException("User id is not in database!");
        board.setUser(user.get());
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
    public void deleteBoard(Long boardId) {
        try{
            boardRepository.deleteById(boardId);
        }catch (Exception e)
        {
            throw new NotFoundException("Board not found!");
        }
    }

    @Override
    public List<ReadUserBoard> getUserBoard(String username, Boolean isLoggedUser) {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new NotFoundException("User not found!");
        List<Board> boards = new ArrayList<>(user.getBoards());
        if(!isLoggedUser)
            boards = boards.stream().filter(board -> !board.getPrivateBoard()).collect(Collectors.toList());
        return boards.stream().map((board -> {
            ReadUserBoard readUserBoard = modelMapper.map(board, ReadUserBoard.class);
            readUserBoard.setNumberOfPictures(board.getPhotos().size());
            Photo fistPhoto = board.getPhotos().stream().findFirst().get();
            readUserBoard.setLastPicture(PhotoServiceImpl.getPhotoFromFile(fistPhoto.getPath()));
            return readUserBoard;
        })).collect(Collectors.toList());
    }

    @Override
    public Boolean addPhotoToBoard(Long boardId, Long photoId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(!board.isPresent())
            throw new NotFoundException("Board not found!");
        Optional<Photo> photo = photoRepository.findById(photoId);
        if(!photo.isPresent())
            throw new NotFoundException("Photo not found!");
        if(board.get().getPhotos().contains(photo.get()))
            return false;
        board.get().getPhotos().add(photo.get());
        boardRepository.flush();
        return true;
    }
}
