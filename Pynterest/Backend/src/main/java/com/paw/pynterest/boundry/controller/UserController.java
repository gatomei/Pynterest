package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.ReadFollowUserDTO;
import com.paw.pynterest.boundry.dto.ReadUserBoard;
import com.paw.pynterest.boundry.dto.ReadUserDTO;
import com.paw.pynterest.boundry.dto.WriteUserDTO;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.model.JwtUserDetails;
import com.paw.pynterest.service.interfaces.*;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/authorize/api/pynterest/user")
public class UserController {

    private UserService userService;
    private AuthenticatedJwtUserService authenticatedJwtUserService;
    private ModelMapper modelMapper;
    private final FollowingService followingService;
    private final BoardServiceInterface boardService;
    private final InterestServiceInterface interestService;

    public UserController(UserService userService, AuthenticatedJwtUserService authenticatedJwtUserService, ModelMapper modelMapper, FollowingService followingService, BoardServiceInterface boardService, InterestServiceInterface interestService){
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
        this.followingService = followingService;
        this.boardService = boardService;
        this.interestService = interestService;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody WriteUserDTO user, @PathVariable Long userId) {

        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();

        if (jwtUserDetails.getUserId().equals(userId)) {

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

    @PutMapping("/{username}/followings/{followedUser}")
    public ResponseEntity<?> followUser(@PathVariable String username, @PathVariable String followedUser)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        String loggedUser = jwtUserDetails.getUsername();
        if (!username.equals(loggedUser))
            return new ResponseEntity<>("Can't modify someone else's followings!", HttpStatus.UNAUTHORIZED);
        if(loggedUser.equals(followedUser))
            return new ResponseEntity<>("Can't follow yourself!", HttpStatus.BAD_REQUEST);
        boolean created = followingService.addToFollowings(loggedUser, followedUser);
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

    @DeleteMapping("/{username}/followings/{followedUser}")
    public ResponseEntity<?> deleteFollowing(@PathVariable String username, @PathVariable String followedUser)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        if(!jwtUserDetails.getUsername().equals(username))
            return new ResponseEntity<>("You are not authorized to do this!", HttpStatus.UNAUTHORIZED);
        followingService.deleteFromFollowings(username, followedUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{username}/boards")
    public ResponseEntity<?> getUserBoards(@PathVariable String username)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        List<ReadUserBoard> boards = boardService.getUserBoards(username, jwtUserDetails.getUsername().equals(username));
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @PutMapping("/{username}/interests/{interestId}")
    public ResponseEntity<?> addOrUpdateInterest(@PathVariable String username, @PathVariable Long interestId)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        if (!jwtUserDetails.getUsername().equals(username))
            return new ResponseEntity<>("You are not authorized to modify someone else's data", HttpStatus.UNAUTHORIZED);
        Boolean created = interestService.addInterest(username, interestId);
        if (created)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{username}/interests/{interestId}")
    public ResponseEntity<?> removeUserInterest(@PathVariable String username, @PathVariable Long interestId)
    {
        JwtUserDetails jwtUserDetails = authenticatedJwtUserService.getAuthenticatedJwtUserDetails();
        if (!jwtUserDetails.getUsername().equals(username))
            return new ResponseEntity<>("You are not authorized to modify someone else's data", HttpStatus.UNAUTHORIZED);
        interestService.deleteInterest(username, interestId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{username}/interests")
    public ResponseEntity<?> getUserInterests(@PathVariable String username)
    {
        return new ResponseEntity<>(interestService.getUserInterests(username), HttpStatus.OK);
    }
}
