package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username);
    User findByResetToken(String resetToken);
}
