package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Following;
import com.paw.pynterest.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following, Long> {
    @Query("SELECT f.id from Following f where f.user = :user and f.followingUser = :followingUser")
    Long verifyIfExists(@Param("user")User user, @Param("followingUser") User followingUser);

    List<Following> findByUser(User user);
    List<Following> findByFollowingUser(User followingUser);
}
