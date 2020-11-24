package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.WriteBoardDTO;

public interface BoardServiceInterface {
    Long addBoard(WriteBoardDTO newBoard);
    void deleteBoard(Long boardId);
}
