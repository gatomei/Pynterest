package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.WriteCategoryDTO;
import com.paw.pynterest.entity.model.Category;

public interface CategoryServiceInterface {
    Long addCategory(WriteCategoryDTO newCategory);
    Category findById(Long categoryId);
}
