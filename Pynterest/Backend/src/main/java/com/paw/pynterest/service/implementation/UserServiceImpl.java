package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.exceptions.AlreadyExistsException;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository)
    {
        this.userRepository=userRepository;
    }

    @Override
    public User save(User user) throws AlreadyExistsException{

        User existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser!=null)
            throw new AlreadyExistsException("Email-ul este deja folosit");
        existingUser=userRepository.findByUsername(user.getUsername());

        if(existingUser!=null)
            throw new AlreadyExistsException("Numele de utilizator este deja folosit");

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
                        .filter(user_->user_.getUsername().equals(username) && user_.getPassword().equals(password))
                        .findAny()
                        .orElse(null);

        return user;
    }
}
