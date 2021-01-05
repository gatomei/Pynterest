package com.paw.pynterest.boardTesting;

import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.UnauthorizedOperationException;
import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.repository.BoardRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.BoardServiceInterface;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BoardServiceTesting {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    BoardServiceInterface boardService;

    @Test
    public void getById_existingId_ShouldReturnBoard() {
        Long boardId = 76L;
        Board getBoard = boardService.findBoardById(boardId);
        Assert.assertEquals(boardId, getBoard.getBoardId());
    }

    @Test
    public void getById_nonExistingId_ShouldThrowException() {
        Exception exception = Assert.assertThrows(NotFoundException.class, () -> boardService.findBoardById(9999L));
    }

    @Test
    public void addPhotoToBoard_UnauthorizedUser_ShouldThrowException()
    {
        Long boardId = 76L;
        Long photoId = 63L;
        Long userId = 28L;
        Assert.assertThrows(UnauthorizedOperationException.class, ()->{
           boardService.addPhotoToBoard(boardId, photoId, userId);
        });
    }

    @Test
    public void addPhotoToBoard_NoPhoto_ShouldThrowException()
    {
        Long boardId = 76L;
        Long photoId = 9999L;
        Long userId = 27L;
        Assert.assertThrows(NotFoundException.class, ()->{
            boardService.addPhotoToBoard(boardId, photoId, userId);
        });
    }

    @Test
    public void addPhotoToBoard_ValidData_ExistingPhotoInBoard_ShouldReturnFalse()
    {
        Long boardId = 76L;
        Long photoId = 64L;
        Long userId = 27L;
        boolean created = boardService.addPhotoToBoard(boardId, photoId, userId);
        Assert.assertFalse(created);
    }

    @Test
    public void addPhotoToBoard_ValidData_ExistingPhotoInBoard_ShouldReturnTrue()
    {
        Long boardId = 76L;
        Long photoId = 80L;
        Long userId = 27L;
        boolean created = boardService.addPhotoToBoard(boardId, photoId, userId);
        Assert.assertTrue(created);
        boardService.deletePhotoFromBoard(boardId,photoId, userId);
    }

    @Test
    public void getUserBoards_NonExistentUser_ShouldThrowException()
    {
        String username = "neexistent";
        Assert.assertThrows(NotFoundException.class, ()->{
            boardService.getUserBoards(username, true);
        });
    }

    @Test
    public void getUserBoards_ValidUser_ShouldReturnACollection()
    {
        String username = "baci";
        List<ReadUserBoard> boards = boardService.getUserBoards(username, true);
        Assert.assertNotNull(boards);
    }
}
