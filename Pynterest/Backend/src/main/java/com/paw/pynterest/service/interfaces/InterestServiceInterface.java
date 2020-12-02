package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadCategoryDTO;

import java.util.List;

public interface InterestServiceInterface {
    Boolean addInterest(String username, Long categoryId);
    void deleteInterest(String username, Long categoryId);
    List<ReadCategoryDTO> getUserInterests(String username);
    List<ReadCategoryDTO> getUserNotFollowedInterests(String username);
}
