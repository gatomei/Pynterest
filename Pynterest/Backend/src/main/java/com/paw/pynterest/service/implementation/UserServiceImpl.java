package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.exceptions.AlreadyExistsException;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.boundry.exceptions.InvalidResetTokenException;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.CategoryRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, CategoryRepository categoryRepository)
    {
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.categoryRepository = categoryRepository;
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
    public User updateUser(Long userId, User newUser) throws NotFoundException {

        User user = userRepository.getOne(userId);

        if(user == null){
            throw new NotFoundException("Nu exista niciun utilizator cu id-ul "+ userId);
        }

        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setFullname(newUser.getFullname());
        user.setPassword(newUser.getPassword());
        user.setAdmin(newUser.isAdmin());
        user.setBirthDate(newUser.getBirthDate());
        user.setDescription(newUser.getDescription());
        user.setProfilePicture(newUser.getProfilePicture());
        return userRepository.save(user);

    }

    @Override
    public User findUserByLoginCredentials(String email, String password) {

        User user = this.findAll()
                .stream()
                .filter(user_->user_.getEmail().equals(email) &&
                        passwordEncoder.matches( password, user_.getPassword()))
                .findAny()
                .orElse(null);

        return user;
    }

    @Override
    public User forgotPassword(String email) throws NotFoundException{
        User user = userRepository.findByEmail(email);
        if(user==null)
            throw new NotFoundException("User with email "+ email+" not found!");

        user.setResetToken(UUID.randomUUID().toString());
        userRepository.save(user);
        return user;
    }

    @Override
    public void resetPassword(String token, String newPassword) {

        User user=userRepository.findByResetToken(token);
        if(user==null)
            throw new InvalidResetTokenException("Oops! This is an invalid password reset link!");

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);

        userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user==null)
            throw new NotFoundException("User with username '"+username+"' not found!");
        return user;
    }

    @Override
    public User findById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new NotFoundException("User is not in database!");
        return user.get();
    }


}
