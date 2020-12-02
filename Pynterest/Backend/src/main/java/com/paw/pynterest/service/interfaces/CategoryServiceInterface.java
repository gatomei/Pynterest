package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.ReadCategoryDTO;
import com.paw.pynterest.boundry.dto.WriteCategoryDTO;

import java.util.List;

public interface CategoryServiceInterface {
    Long addCategory(WriteCategoryDTO newCategory);
    List<ReadCategoryDTO> getAllCategories();

}
