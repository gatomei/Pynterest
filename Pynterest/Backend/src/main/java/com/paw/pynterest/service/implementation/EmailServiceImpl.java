package com.paw.pynterest.service.implementation;

import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.service.interfaces.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender mailSender;
    private final String frontEndUrl = "http://127.0.0.1:4200";

    public EmailServiceImpl(JavaMailSender mailSender)
    {
        this.mailSender=mailSender;
    }

    @Async
    @Override
    public void sendResetPasswordEmail(User user) {
        SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
        passwordResetEmail.setFrom("pynterest.app@gmail.com");
        passwordResetEmail.setTo(user.getEmail());
        passwordResetEmail.setSubject("Password Reset Request");
        passwordResetEmail.setText("To reset your password, click the link below:\r\n" +
                frontEndUrl+"/reset-password"
                + "?token=" + user.getResetToken());

        mailSender.send(passwordResetEmail);
    }
}