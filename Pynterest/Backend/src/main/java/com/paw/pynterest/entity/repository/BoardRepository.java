package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
