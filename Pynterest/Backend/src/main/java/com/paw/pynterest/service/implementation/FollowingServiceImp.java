package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.entity.model.Following;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.FollowingRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.FollowingService;
import com.paw.pynterest.service.interfaces.UserService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class FollowingServiceImp implements FollowingService {

    private final UserRepository userRepository;
    private final FollowingRepository followingRepository;
    private final UserService userService;

    public FollowingServiceImp(UserRepository userRepository, FollowingRepository followingRepository, UserService userService) {
        this.userRepository = userRepository;
        this.followingRepository = followingRepository;
        this.userService = userService;
    }

    @Override
    public boolean addToFollowings(String username, String followedUsername) {
        User followedUser = userService.findUserByUsername(followedUsername);
        User user = userService.findUserByUsername(username);
        if(followingRepository.verifyIfExists(user, followedUser) != null)
            return false;
        Following createdFollowing = new Following();
        createdFollowing.setUser(user);
        createdFollowing.setFollowingUser(followedUser);
        followingRepository.saveAndFlush(createdFollowing);
        return true;
    }

    @Override
    public Set<User> getFollowers(String username) {
        User user = userService.findUserByUsername(username);
        Set<User> followers = new HashSet<>();
        followingRepository.findByFollowingUser(user).forEach((following)->{
            followers.add(following.getUser());
        });
        return followers;
    }

    @Override
    public Set<User> getFollowings(String username) {
        User user = userService.findUserByUsername(username);
        Set<User> followings = new HashSet<>();
        followingRepository.findByUser(user).forEach((following)->{
            followings.add(following.getFollowingUser());
        });
        return followings;
    }

    @Override
    public void deleteFromFollowings(String username, String followedUsername) {
        User followedUser = userService.findUserByUsername(followedUsername);
        User user = userService.findUserByUsername(username);
        Long followingId = followingRepository.verifyIfExists(user, followedUser);
        if(followingId == null)
            throw new NotFoundException("You are not following this user!");
        Following following = new Following();
        following.setId(followingId);
        following.setUser(user);
        following.setFollowingUser(followedUser);
        followingRepository.delete(following);
    }

}
