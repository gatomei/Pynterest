package com.paw.pynterest.boundry.controller;


import com.paw.pynterest.boundry.dto.WriteCategoryDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.service.interfaces.PhotoServiceInterface;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/pynterest/photos")
public class PhotoController {
    private final PhotoServiceInterface photoService;

    public PhotoController(PhotoServiceInterface photoService){
        this.photoService = photoService;
    }

    @PostMapping("")
    public ResponseEntity<?> addCategory(@RequestBody @Valid WritePhotoDTO newPhoto)
    {
        Long photoId = photoService.addPhoto(newPhoto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", photoId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<?> deletePhoto(@PathVariable Long photoId)
    {
        photoService.deletePhoto(photoId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
