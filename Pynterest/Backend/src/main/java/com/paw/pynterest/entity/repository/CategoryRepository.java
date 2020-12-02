package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByName(String name);
    List<Category> findCategoriesByUsersNotContains(User user);
}
