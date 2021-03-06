package com.paw.searchengine.boundry.controllers;

import com.paw.searchengine.persistence.documents.Photo;
import com.paw.searchengine.services.interfaces.PhotoServiceInterface;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoServiceInterface photoService;

    public PhotoController(PhotoServiceInterface photoService) {
        this.photoService = photoService;
    }

    @PostMapping("")
    public ResponseEntity<?> addPhoto(@RequestBody Photo photo)
    {
        photoService.addPhoto(photo);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", photo.getPhotoId().toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("{photoId}")
    public ResponseEntity<?> deletePhoto(@PathVariable Long photoId)
    {
        photoService.deletePhoto(photoId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getPhotos(@RequestParam String filter)
    {
        List<Photo> matchingPhotos = photoService.getPhotosByTitleOrDescription(filter);
        List<Long> matchingPhotosId = matchingPhotos.stream()
                .map(Photo::getPhotoId)
                .collect(Collectors.toList());
        return new ResponseEntity<>(matchingPhotosId, HttpStatus.OK);
    }
}
