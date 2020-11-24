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
        user.setNumberFollowers(followingService.getFollowers(u.getUsername()).size());
        user.setNumberFollowings(followingService.getFollowings(u.getUsername()).size());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/followings/{followedUser}")
    public ResponseEntity<?> followUser(@PathVariable String followedUser)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        String username = jwtUserDetails.getUsername();
        if(username.equals(followedUser))
            return new ResponseEntity<>("Can't follow yourself!", HttpStatus.BAD_REQUEST);
        boolean created = followingService.addToFollowings(username, followedUser);
        if (created)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{username}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable String username)
    {
        Set<ReadFollowUserDTO> followers =  followingService.getFollowers(username).stream().map(user ->
                modelMapper.map(user, ReadFollowUserDTO.class)
        ).collect(Collectors.toSet());
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    @GetMapping("/{username}/followings")
    public ResponseEntity<?> getFollowings(@PathVariable String username)
    {
        Set<ReadFollowUserDTO> followings =  followingService.getFollowings(username).stream().map(user ->
                modelMapper.map(user, ReadFollowUserDTO.class)
        ).collect(Collectors.toSet());
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }

    @DeleteMapping("/followings/{followedUser}")
    public ResponseEntity<?> deleteFollowing(@PathVariable String followedUser)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        followingService.deleteFromFollowings(jwtUserDetails.getUsername(), followedUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
