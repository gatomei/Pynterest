package com.paw.searchengine.services.implementations;

import com.paw.searchengine.boundry.exceptions.DataAlreadyExists;
import com.paw.searchengine.boundry.exceptions.NotFoundException;
import com.paw.searchengine.persistence.documents.Photo;
import com.paw.searchengine.persistence.repositories.PhotoRepository;
import com.paw.searchengine.services.interfaces.PhotoServiceInterface;
import org.springframework.stereotype.Service;

@Service
public class PhotoService implements PhotoServiceInterface {
    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    @Override
    public void addPhoto(Photo photo) {
        try {
            photoRepository.save(photo);
        }
        catch (Exception e)
        {
            throw new DataAlreadyExists("Photo already exists!");
        }
    }

    @Override
    public void deletePhoto(Long photoId) {
        try {
            photoRepository.deleteById(photoId);
        }
        catch (Exception e)
        {
            throw new NotFoundException("Photo not found!");
        }
    }
}
