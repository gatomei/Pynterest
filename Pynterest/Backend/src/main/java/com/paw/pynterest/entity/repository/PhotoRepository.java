package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo,Long> {
    Photo getFirstByBoardsContains(Board board);
    Integer countByBoardsContains(Board board);
}
