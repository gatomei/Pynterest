package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.Photo;

public interface ElasticsearchServiceInterface {
    void indexPhoto(Photo photo);
    void deletePhoto(Long photoId);
}
