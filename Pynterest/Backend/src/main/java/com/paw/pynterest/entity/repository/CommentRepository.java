package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Comment;
import com.paw.pynterest.entity.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentsByPhoto(Photo photo);
}
