package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.LoginCredentialsDTO;
import com.paw.pynterest.boundry.dto.UserDTO;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.JwtGenerator;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/pynterest/authentication")
public class AuthenticationController {

    private UserService userService;
    private ModelMapper modelMapper;
    private JwtGenerator jwtGenerator;

    public AuthenticationController(JwtGenerator jwtGenerator, UserService userService, ModelMapper modelMapper){
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO user) {
        User newUser = userService.save(modelMapper.map(user, User.class));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginCredentialsDTO loginCredentials){

        String email = loginCredentials.getEmail();
        String password = loginCredentials.getPassword();

        final User findUser = userService.findUserByLoginCredentials(email, password);

        if(findUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else{
            return new ResponseEntity<>(jwtGenerator.generate(findUser), HttpStatus.OK);
        }
    }


}
