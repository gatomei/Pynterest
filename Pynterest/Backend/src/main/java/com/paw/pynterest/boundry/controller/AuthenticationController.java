package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.*;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.JwtGenerator;
import com.paw.pynterest.service.interfaces.EmailService;
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
    private EmailService emailService;

    public AuthenticationController(JwtGenerator jwtGenerator, UserService userService,
                                    ModelMapper modelMapper, EmailService emailService) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.jwtGenerator = jwtGenerator;
        this.emailService=emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody WriteUserDTO writeUserDTO) {
        userService.save(modelMapper.map(writeUserDTO, User.class));
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
            JwtDTO jwtDTO=new JwtDTO();
            jwtDTO.setJwt(jwtGenerator.generate(findUser));
            return new ResponseEntity<>(jwtDTO, HttpStatus.OK);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordDTO forgotPasswordDTO) {

        User user = userService.forgotPassword(forgotPasswordDTO.getEmail());
        emailService.sendResetPasswordEmail(user);

        HTTPResponseMessagesDTO message = new HTTPResponseMessagesDTO();
        message.setMessage("A password reset link has been sent to you!");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPasword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
        userService.resetPassword(resetPasswordDTO.getResetToken(), resetPasswordDTO.getNewPassword());

        HTTPResponseMessagesDTO message = new HTTPResponseMessagesDTO();
        message.setMessage("You have successfully reset your password.  You may now login.");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
