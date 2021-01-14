package com.paw.searchengine.persistence.repositories;

import com.paw.searchengine.persistence.documents.Photo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PhotoRepository extends ElasticsearchRepository<Photo, Long> {
    List<Photo> findAllByTitleContainingOrDescriptionContaining(String title,String description);
}
