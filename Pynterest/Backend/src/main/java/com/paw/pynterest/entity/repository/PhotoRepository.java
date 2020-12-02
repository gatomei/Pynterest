package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo,Long> {
    Photo getFirstByBoardsContains(Board board);
    Integer countByBoardsContains(Board board);
    List<Photo> findAllByUser(User user);
}
