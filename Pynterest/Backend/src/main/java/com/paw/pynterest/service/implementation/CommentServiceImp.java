package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadCommentDTO;
import com.paw.pynterest.boundry.dto.WriteCommentDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.UnauthorizedOperationException;
import com.paw.pynterest.entity.model.Comment;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.CommentRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.CommentServiceInterface;
import com.paw.pynterest.service.interfaces.PhotoServiceInterface;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImp implements CommentServiceInterface {
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final PhotoServiceInterface photoService;
    private final ModelMapper modelMapper;

    public CommentServiceImp(CommentRepository commentRepository, UserRepository userRepository, PhotoRepository photoRepository, UserService userService, PhotoServiceInterface photoService, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.photoService = photoService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Long createComment(Long photoId, Long userId, WriteCommentDTO comment) {
        Photo photo = photoService.findById(photoId);
        User user = userService.findById(userId);
        Comment newComment = new Comment();
        newComment.setUser(user);
        newComment.setPhoto(photo);
        newComment.setContent(comment.getContent());
        Comment savedComment = commentRepository.saveAndFlush(newComment);
        return savedComment.getCommentId();
    }

    @Override
    public void deleteCommentFromPhoto(Long photoId, Long userId, Long commentId) {
        Comment comment = findCommentById(commentId);
        Photo photo = photoService.findById(photoId);
        User user = userService.findById(userId);
        if (photo != comment.getPhoto())
            throw new UnauthorizedOperationException("You can't delete a comment from another photo!");
        if (user != comment.getUser())
            throw new UnauthorizedOperationException("You can't delete someone else's comment");
        commentRepository.delete(comment);
    }

    @Override
    public Comment findCommentById(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (!comment.isPresent())
            throw new NotFoundException("Comment not found!");
        return comment.get();
    }

    @Override
    public List<ReadCommentDTO> getCommentsFromPhoto(Long photoId) {
        Photo photo = photoService.findById(photoId);
        List<Comment> commentsPhoto = commentRepository.findCommentsByPhoto(photo);
        return commentsPhoto.stream().map(comment -> {
            ReadCommentDTO readComment =  modelMapper.map(comment, ReadCommentDTO.class);
            readComment.setUsername(comment.getUser().getUsername());
            return readComment;
        }).collect(Collectors.toList());
    }

    @Override
    public ReadCommentDTO getComment(Long photoId, Long commentId) {
        Comment comment = findCommentById(commentId);
        Photo photo = photoService.findById(photoId);
        if (photo != comment.getPhoto())
            throw new NotFoundException("Comment not found on this photo");
        ReadCommentDTO commentDTO = modelMapper.map(comment, ReadCommentDTO.class);
        commentDTO.setUsername(comment.getUser().getUsername());
        return commentDTO;
    }
}
