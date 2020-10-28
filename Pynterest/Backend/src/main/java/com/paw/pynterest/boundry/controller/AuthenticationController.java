package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.UserDTO;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/pynterest/authentication")
public class AuthenticationController {

    private UserService userService;
    private ModelMapper modelMapper;

    public AuthenticationController(UserService userService,
                                    ModelMapper modelMapper)
    {
        this.userService = userService;
        this.modelMapper=modelMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO user)
    {

        User newUser = userService.save(modelMapper.map(user, User.class));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
