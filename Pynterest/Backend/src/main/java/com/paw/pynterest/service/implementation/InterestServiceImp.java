package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadCategoryDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.CategoryRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.CategoryServiceInterface;
import com.paw.pynterest.service.interfaces.InterestServiceInterface;
import com.paw.pynterest.service.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InterestServiceImp implements InterestServiceInterface {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final CategoryServiceInterface categoryService;

    public InterestServiceImp(CategoryRepository categoryRepository, UserRepository userRepository, ModelMapper modelMapper, UserService userService, CategoryServiceInterface categoryService) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @Override
    public Boolean addInterest(String username, Long categoryId) {
        User user = userService.findUserByUsername(username);
        Category category = categoryService.findById(categoryId);
        if (userRepository.existsByUsernameAndInterestsContains(username, category))
            return false;
        user.getInterests().add(category);
        userRepository.flush();
        return true;
    }

    @Override
    public void deleteInterest(String username, Long categoryId) {
        User user = userService.findUserByUsername(username);
        Category category = categoryService.findById(categoryId);
        user.getInterests().remove(category);
        userRepository.flush();
    }

    @Override
    public List<ReadCategoryDTO> getUserInterests(String username) {
        User user = userService.findUserByUsername(username);
        return user.getInterests().stream().map(interest ->
                modelMapper.map(interest, ReadCategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<ReadCategoryDTO> getUserNotFollowedInterests(String username) {
        User user = userService.findUserByUsername(username);
        return categoryRepository.findCategoriesByUsersNotContains(user).stream().map(interest ->
                modelMapper.map(interest, ReadCategoryDTO.class)).collect(Collectors.toList());
    }
}
