package com.paw.searchengine.services.interfaces;

import com.paw.searchengine.persistence.documents.Photo;

public interface PhotoServiceInterface {
    void addPhoto(Photo photo);
    void deletePhoto(Long photoId);
}
