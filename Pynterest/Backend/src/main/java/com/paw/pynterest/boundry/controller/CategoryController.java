package com.paw.pynterest.boundry.controller;


import com.paw.pynterest.boundry.dto.WriteCategoryDTO;
import com.paw.pynterest.service.interfaces.CategoryServiceInterface;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/pynterest/categories")
public class CategoryController {
    private final CategoryServiceInterface categoryService;
    public CategoryController(CategoryServiceInterface categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping("")
    public ResponseEntity<?> addCategory(@RequestBody @Valid WriteCategoryDTO newCategory)
    {
        Long categoryId = categoryService.addCategory(newCategory);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", categoryId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}
