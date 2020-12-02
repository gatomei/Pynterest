package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.entity.model.Photo;

import java.util.List;

public interface PhotoServiceInterface {
    Long addPhoto(WritePhotoDTO newPhoto, Long userId);
    void deletePhoto(Long photoId);
    ReadPhotoDTO getPhotoById(Long photoId);
    List<ReadPhotoDTO> getAllPhotoByUserName(String userName);
    Photo findById(Long photoId);
}
