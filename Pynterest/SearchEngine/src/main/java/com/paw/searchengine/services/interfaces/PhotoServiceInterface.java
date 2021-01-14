package com.paw.searchengine.services.interfaces;

import com.paw.searchengine.persistence.documents.Photo;

import java.util.List;

public interface PhotoServiceInterface {
    void addPhoto(Photo photo);
    void deletePhoto(Long photoId);
    List<Photo> getPhotosByTitleOrDescription(String filter);
}
