package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.exceptions.AlreadyExistsException;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder)
    {
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public User save(User user) throws AlreadyExistsException{

        User existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser!=null)
            throw new AlreadyExistsException("Email is already in use!");
        existingUser=userRepository.findByUsername(user.getUsername());

        if(existingUser!=null)
            throw new AlreadyExistsException("Username is already in use!");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Override
    public User findUserByLoginCredentials(String username, String password) {
        User user = this.findAll()
                        .stream()
                        .filter(user_->user_.getUsername().equals(username) &&
                                passwordEncoder.matches( password, user_.getPassword()))
                        .findAny()
                        .orElse(null);

        return user;
    }
}
