package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.WriteBoardDTO;
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

    public BoardController(BoardServiceInterface boardService) {
        this.boardService = boardService;
    }

    @PostMapping("")
    public ResponseEntity<?> addBoard(@RequestBody @Valid WriteBoardDTO newBoard)
    {
        Long boardId = boardService.addBoard(newBoard);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", boardId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long boardId)
    {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{boardId}/photos/{photoId}")
    public ResponseEntity<?> addPhotoToBoard(@PathVariable Long boardId, @PathVariable Long photoId)
    {
        Boolean created = boardService.addPhotoToBoard(boardId, photoId);
        if (created)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
