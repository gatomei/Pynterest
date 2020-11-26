package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import java.util.List;

public interface BoardServiceInterface {
    Long addBoard(WriteBoardDTO newBoard);
    void deleteBoard(Long boardId);
    List<ReadUserBoard> getUserBoard(String username, Boolean isLoggedUser);
    Boolean addPhotoToBoard(Long boardId, Long photoId);
}
