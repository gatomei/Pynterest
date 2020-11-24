package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.WritePhotoDTO;

public interface PhotoServiceInterface {
    Long addPhoto(WritePhotoDTO newPhoto);
    void deletePhoto(Long photoId);
}
