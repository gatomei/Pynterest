package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.User;

import java.util.List;

public interface UserService {

    User save(User user);
    List<User> findAll();
    User findUserByLoginCredentials(String username, String password);
    User updateUser(Long userId, User newUser);
    User forgotPassword(String email);
    void resetPassword(String token, String newPassword);
    User findUserByUsername(String username);
}
