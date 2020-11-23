package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.User;

import java.util.List;
import java.util.Set;

public interface FollowingService {
    boolean addToFollowings(Long userId, Long followedUserId);
    Set<User> getFollowers(Long userId);
    Set<User> getFollowings(Long userId);
}
