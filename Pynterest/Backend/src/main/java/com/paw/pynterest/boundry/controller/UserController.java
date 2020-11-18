package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.WriteUserDTO;
import com.paw.pynterest.boundry.dto.ReadUserDTO;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.model.JwtUserDetails;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/authorize/api/pynterest/user")
public class UserController {

    private UserService userService;
    private AuthenticatedJwtUserService authenticatedJwtUserService;
    private ModelMapper modelMapper;

    public UserController(UserService userService, AuthenticatedJwtUserService authenticatedJwtUserService, ModelMapper modelMapper){
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.authenticatedJwtUserService = authenticatedJwtUserService;
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
    public ResponseEntity<?> getUserByUsername(@RequestParam String username)
    {
        User u = userService.findUserByUsername(username);
        return new ResponseEntity<>(modelMapper.map(u, ReadUserDTO.class), HttpStatus.OK);
    }
}
