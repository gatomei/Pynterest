package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.User;

import java.util.List;
import java.util.Set;

public interface FollowingService {
    boolean addToFollowings(String username, String followedUsername);
    Set<User> getFollowers(String username);
    Set<User> getFollowings(String username);
    void deleteFromFollowings(String username, String followedUsername);
}
