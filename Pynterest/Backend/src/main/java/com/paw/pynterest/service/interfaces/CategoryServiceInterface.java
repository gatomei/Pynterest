package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.WriteCategoryDTO;

public interface CategoryServiceInterface {
    Long addCategory(WriteCategoryDTO newCategory);
}
