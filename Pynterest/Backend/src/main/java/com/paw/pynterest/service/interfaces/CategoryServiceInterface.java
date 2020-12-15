package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadCategoryDTO;
import com.paw.pynterest.boundry.dto.WriteCategoryDTO;
import com.paw.pynterest.entity.model.Category;

import java.util.List;

public interface CategoryServiceInterface {
    Long addCategory(WriteCategoryDTO newCategory);
    List<ReadCategoryDTO> getAllCategories();
    Category findById(Long categoryId);
    List<Long> getCategoryPhotos(Long categoryId);
}
