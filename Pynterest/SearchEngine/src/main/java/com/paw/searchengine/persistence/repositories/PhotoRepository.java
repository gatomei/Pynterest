package com.paw.searchengine.persistence.repositories;

import com.paw.searchengine.persistence.documents.Photo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PhotoRepository extends ElasticsearchRepository<Photo, Long> {
}
