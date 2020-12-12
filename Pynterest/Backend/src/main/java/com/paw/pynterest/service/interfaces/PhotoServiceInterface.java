package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.entity.model.Photo;

import java.io.File;
import java.util.List;
import java.util.Optional;

public interface PhotoServiceInterface {
    Long addPhoto(WritePhotoDTO newPhoto, Long userId);
    void deletePhoto(Long photoId);
    ReadPhotoDTO getPhotoById(Long photoId);
    List<Photo> getAllPhotoByUserName(String userName, int photoNumber, Long lastPhotoSentId);
    Photo findById(Long photoId);
    List<Photo> getPhotosForMainPage(Long userId,int photoNumber, Long lastPhotoSentId);
    List<Photo> getPhotosFromBoard(String boardTitle,Long userId,int photoNumber, Long lastPhotoSentId);

}
