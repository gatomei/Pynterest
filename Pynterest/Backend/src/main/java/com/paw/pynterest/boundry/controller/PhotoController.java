package com.paw.pynterest.boundry.controller;


import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WriteCommentDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.service.implementation.PhotoServiceImpl;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import com.paw.pynterest.service.interfaces.CommentServiceInterface;
import com.paw.pynterest.service.interfaces.PhotoServiceInterface;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/authorize/api/pynterest/photos")
public class PhotoController {
    private final PhotoServiceInterface photoService;
    private final AuthenticatedJwtUserService authenticatedJwtUserService;
    private final CommentServiceInterface commentService;
    private final ModelMapper modelMapper;

    public PhotoController(PhotoServiceInterface photoService, AuthenticatedJwtUserService authenticatedJwtUserService, CommentServiceInterface commentService, ModelMapper modelMapper){
        this.photoService = photoService;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
        this.commentService = commentService;
        this.modelMapper = modelMapper;
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

    @GetMapping("/MainPage")
    public ResponseEntity<?> getPhotosForMainPage(@RequestParam int photoNumber, @RequestParam(required = false) Long lastPhotoSentId)
    {
        Long userId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        List<Photo> photosFromService = photoService.getPhotosForMainPage(userId,photoNumber,lastPhotoSentId);
        List<ReadPhotoDTO> photosToReturn =(List<ReadPhotoDTO>)modelMapper.map(photosFromService, new TypeToken<List<ReadPhotoDTO>>(){}.getType());
        photosToReturn.forEach(p -> {p.setPictureData(PhotoServiceImpl.getPhotoFromFile(p.getPath()));});
       
        return new ResponseEntity<>(photosToReturn,HttpStatus.OK);
    }

    @GetMapping("/BoardPhoto")
    public ResponseEntity<?> getPhotosFromBoard(@RequestParam String boardName,@RequestParam int photoNumber, @RequestParam(required = false) Long lastPhotoSentId){
        Long userId = authenticatedJwtUserService.getAuthenticatedJwtUserDetails().getUserId();
        List<Photo> photosFromService = photoService.getPhotosFromBoard(boardName,userId,photoNumber,lastPhotoSentId);
        List<ReadPhotoDTO> photosToReturn =(List<ReadPhotoDTO>)modelMapper.map(photosFromService, new TypeToken<List<ReadPhotoDTO>>(){}.getType());
        photosToReturn.forEach(p -> {p.setPictureData(PhotoServiceImpl.getPhotoFromFile(p.getPath()));});

        return new ResponseEntity<>(photosToReturn,HttpStatus.OK);
    }



    @GetMapping("/UserPhotos")
    public ResponseEntity<?> getUserPhotosByUserName(@RequestParam String userName, @RequestParam int photoNumber, @RequestParam(required = false) Long lastPhotoSendId){
        List<Photo> photosFromService = photoService.getAllPhotoByUserName(userName, photoNumber, lastPhotoSendId);
        List<ReadPhotoDTO> photosToReturn =(List<ReadPhotoDTO>)modelMapper.map(photosFromService, new TypeToken<List<ReadPhotoDTO>>(){}.getType());
        photosToReturn.forEach(p -> {p.setPictureData(PhotoServiceImpl.getPhotoFromFile(p.getPath()));});
        return new ResponseEntity<>(photosToReturn,HttpStatus.OK);
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

    @GetMapping("/{photoId}/comments/{commentId}")
    public ResponseEntity<?> getComment(@PathVariable Long photoId, @PathVariable Long commentId)
    {
        return new ResponseEntity<>(commentService.getComment(photoId, commentId), HttpStatus.OK);
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
