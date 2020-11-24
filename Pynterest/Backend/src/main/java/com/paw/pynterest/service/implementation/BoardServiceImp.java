package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.BoardRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.BoardServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BoardServiceImp implements BoardServiceInterface {


    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public BoardServiceImp(BoardRepository boardRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
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
}
