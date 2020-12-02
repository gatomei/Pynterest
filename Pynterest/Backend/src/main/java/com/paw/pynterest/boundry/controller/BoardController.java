package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.WriteBoardDTO;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import com.paw.pynterest.service.interfaces.BoardServiceInterface;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/authorize/api/pynterest/boards")
public class BoardController {
    private final BoardServiceInterface boardService;
    private final AuthenticatedJwtUserService authenticatedJwtUserService;

    public BoardController(BoardServiceInterface boardService, AuthenticatedJwtUserService authenticatedJwtUserService) {
        this.boardService = boardService;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
    }

    @PostMapping("")
    public ResponseEntity<?> addBoard(@RequestBody @Valid WriteBoardDTO newBoard)
    {
        Long loggedUserId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        Long boardId = boardService.addBoard(newBoard, loggedUserId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", boardId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long boardId)
    {
        Long loggedUserId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        boardService.deleteBoard(boardId, loggedUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{boardId}/photos/{photoId}")
    public ResponseEntity<?> addPhotoToBoard(@PathVariable Long boardId, @PathVariable Long photoId)
    {
        Long loggedUserId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        Boolean created = boardService.addPhotoToBoard(boardId, photoId, loggedUserId);
        if (created)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}/photos/{photoId}")
    public ResponseEntity<?> removePhotoFromBoard(@PathVariable Long boardId, @PathVariable Long photoId)
    {
        Long loggedUserId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        boardService.deletePhotoFromBoard(boardId, photoId, loggedUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
