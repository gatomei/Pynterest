package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadCommentDTO;
import com.paw.pynterest.boundry.dto.WriteCommentDTO;
import com.paw.pynterest.entity.model.Comment;
import java.util.List;

public interface CommentServiceInterface {
    Long createComment(Long photoId, Long userId, WriteCommentDTO comment);
    void deleteCommentFromPhoto(Long photoId, Long userId, Long commentId);
    Comment findCommentById(Long commentId);
    List<ReadCommentDTO> getCommentsFromPhoto(Long photoId);
    ReadCommentDTO getComment(Long photoId, Long commentId);
}
