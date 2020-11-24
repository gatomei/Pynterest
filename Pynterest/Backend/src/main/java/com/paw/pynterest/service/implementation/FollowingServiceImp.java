package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.FollowingService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class FollowingServiceImp implements FollowingService {

    private final UserRepository userRepository;

    public FollowingServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean addToFollowings(Long userId, Long followedUserId) {
        Optional<User> followedUser = userRepository.findById(followedUserId);
        if(!followedUser.isPresent())
            throw new NotFoundException("Followed user not found!");
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new NotFoundException("User not found!");
        if(user.get().getFollowings().contains(followedUser.get()))
            return false;
        user.get().followUser(followedUser.get());
        userRepository.flush();
        return true;
    }

    @Override
    public Set<User> getFollowers(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent())
            throw new NotFoundException("User not found!");
        Set<User> followers = new HashSet<>();
        userRepository.findAll().forEach((dbUser)->{
            if(dbUser.getFollowings().contains(user.get()))
                followers.add(dbUser);
        });
        return followers;
    }

    @Override
    public Set<User> getFollowings(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent())
            throw new NotFoundException("User not found!");
        return user.get().getFollowings();
    }

}
