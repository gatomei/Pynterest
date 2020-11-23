package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.ReadFollowUserDTO;
import com.paw.pynterest.boundry.dto.WriteUserDTO;
import com.paw.pynterest.boundry.dto.ReadUserDTO;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.model.JwtUserDetails;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import com.paw.pynterest.service.interfaces.FollowingService;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/authorize/api/pynterest/user")
public class UserController {

    private UserService userService;
    private AuthenticatedJwtUserService authenticatedJwtUserService;
    private ModelMapper modelMapper;
    private final FollowingService followingService;

    public UserController(UserService userService, AuthenticatedJwtUserService authenticatedJwtUserService, ModelMapper modelMapper, FollowingService followingService){
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
        this.followingService = followingService;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody WriteUserDTO user, @PathVariable Long userId) {

        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();

        if (jwtUserDetails.getUserId() == userId) {

            User updatedUser = userService.updateUser(userId, modelMapper.map(user, User.class));

            if (updatedUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("You are not authorized to modify this user's data!", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping()
    public ResponseEntity<?> getUserByUsername(@RequestParam(value = "username", required = true) String username)
    {
        User u = userService.findUserByUsername(username);
        ReadUserDTO user = modelMapper.map(u, ReadUserDTO.class);
        user.setNumberFollowers(followingService.getFollowers(u.getUserId()).size());
        user.setNumberFollowings(u.getFollowings().size());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userId}/followings/{followedUserId}")
    public ResponseEntity<?> addSubscriber(@PathVariable Long userId, @PathVariable Long followedUserId)
    {
        if(userId.equals(followedUserId))
            return new ResponseEntity<>("Can't follow yourself!", HttpStatus.BAD_REQUEST);

        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        if(!jwtUserDetails.getUserId().equals(userId))
            return new ResponseEntity<>("Your not allowed to add a new following for this user!", HttpStatus.UNAUTHORIZED);
        boolean created = followingService.addToFollowings(userId, followedUserId);
        if (created)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable Long userId)
    {
        Set<ReadFollowUserDTO> followers =  followingService.getFollowers(userId).stream().map(user ->
                modelMapper.map(user, ReadFollowUserDTO.class)
        ).collect(Collectors.toSet());
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    @GetMapping("/{userId}/followings")
    public ResponseEntity<?> getFollowings(@PathVariable Long userId)
    {
        Set<ReadFollowUserDTO> followings =  followingService.getFollowings(userId).stream().map(user ->
                modelMapper.map(user, ReadFollowUserDTO.class)
        ).collect(Collectors.toSet());
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }
}
