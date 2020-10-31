package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.User;

public interface EmailService {

    void sendResetPasswordEmail(User user);
}
