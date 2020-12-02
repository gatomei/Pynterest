package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select b from Board b where b.privateBoard = false and b.user.username = :username")
    List<Board> getPublicBoards(@Param("username")String username);

    @Query("select b from Board b where b.user.username = :username")
    List<Board> getUserBoards(@Param("username")String username);

    Boolean existsByPhotosContainsAndBoardId(Photo photo, Long boardId);
}
