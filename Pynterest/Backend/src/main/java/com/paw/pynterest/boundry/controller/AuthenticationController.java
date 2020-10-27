package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.service.interfaces.UserService;
import org.springframework.http.HttpHeaders;
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

    public AuthenticationController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user)
    {
        User newUser = userService.save(user);

        //TODO
        //verify if location header is needed for register

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", newUser.getUserId().toString());

        return new ResponseEntity<>(responseHeaders, HttpStatus.CREATED);
    }

}
