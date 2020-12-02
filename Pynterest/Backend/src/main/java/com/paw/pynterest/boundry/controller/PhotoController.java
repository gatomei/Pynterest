package com.paw.pynterest.boundry.controller;


import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WriteCommentDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import com.paw.pynterest.service.interfaces.CommentServiceInterface;
import com.paw.pynterest.service.interfaces.PhotoServiceInterface;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/authorize/api/pynterest/photos")
public class PhotoController {
    private final PhotoServiceInterface photoService;
    private final AuthenticatedJwtUserService authenticatedJwtUserService;
    private final CommentServiceInterface commentService;

    public PhotoController(PhotoServiceInterface photoService, AuthenticatedJwtUserService authenticatedJwtUserService, CommentServiceInterface commentService){
        this.photoService = photoService;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
        this.commentService = commentService;
    }

    @PostMapping("")
    public ResponseEntity<?> addPhoto(@RequestBody @Valid WritePhotoDTO newPhoto)
    {
        Long userId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        Long photoId = photoService.addPhoto(newPhoto, userId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", photoId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @GetMapping("/{photoId}")
    public ResponseEntity<?> getPhotoById(@PathVariable Long photoId)
    {
        ReadPhotoDTO photoToReturn = photoService.getPhotoById(photoId);
        return new ResponseEntity<>(photoToReturn,HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getUserPhotosByUserName(@RequestParam String userName){
        List<ReadPhotoDTO> photoListToReturn = photoService.getAllPhotoByUserName(userName);
        return new ResponseEntity<>(photoListToReturn,HttpStatus.OK);
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<?> deletePhoto(@PathVariable Long photoId)
    {
        photoService.deletePhoto(photoId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{photoId}/comments")
    public ResponseEntity<?> createComment(@PathVariable Long photoId, @RequestBody @Valid WriteCommentDTO comment)
    {
        Long userId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        Long commentId = commentService.createComment(photoId, userId, comment);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", commentId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{photoId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long photoId, @PathVariable Long commentId)
    {
        Long userId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        commentService.deleteCommentFromPhoto(photoId, userId, commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{photoId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long photoId)
    {
        return new ResponseEntity<>(commentService.getCommentsFromPhoto(photoId), HttpStatus.OK);
    }
}
