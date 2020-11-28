package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import java.util.List;

public interface BoardServiceInterface {
    Long addBoard(WriteBoardDTO newBoard, Long loggedUserId);
    void deleteBoard(Long boardId);
    List<ReadUserBoard> getUserBoards(String username, Boolean isLoggedUser);
    Boolean addPhotoToBoard(Long boardId, Long photoId,  Long loggedUserId);
    void deletePhotoFromBoard(Long boardId, Long photoId, Long loggedUserId);
}
