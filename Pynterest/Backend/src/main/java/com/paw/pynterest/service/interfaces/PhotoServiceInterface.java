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
    List<ReadPhotoDTO> getAllPhotoByUserName(String userName);
    Photo findById(Long photoId);
    List<Photo> getPhotosForMainPage(Long userId,int photoNumber, Long lastPhotoSentId);
}
