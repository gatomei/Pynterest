package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadCategoryDTO;
import com.paw.pynterest.boundry.dto.WriteCategoryDTO;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.boundry.exceptions.DirectoryCreationException;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.repository.CategoryRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.service.interfaces.CategoryServiceInterface;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryServiceInterface {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper, PhotoRepository photoRepository)
    {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Long addCategory(WriteCategoryDTO newCategory){
        Category category = modelMapper.map(newCategory, Category.class);
        category.setName(category.getName().toLowerCase());
        try{
            File directory = new File("Categories/" + category.getName());
            if(!directory.exists())
            {
                boolean success = directory.mkdirs();
                if (!success) {
                    throw new DirectoryCreationException("Can't make directory for " + newCategory.getName());
                }
            }
            Category savedCategory = categoryRepository.saveAndFlush(category);
            return savedCategory.getCategoryId();
        }
        catch (org.springframework.dao.DataIntegrityViolationException dataIntegrityViolationException) {
            throw new DataIntegrityViolationException("There is already a category with this title!");
        }
        catch (Exception e)
        {
            throw new ServerErrorException("Couldn't save category!");
        }
    }

    @Override
    public List<ReadCategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> modelMapper.map(category, ReadCategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Category findById(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (!category.isPresent())
            throw new NotFoundException("Category not found!");
        return category.get();
    }

    @Override
    public List<Long> getCategoryPhotos(Long categoryId) {
        Category category = findById(categoryId);
        return category.getPhotos().stream().map(Photo::getPhotoId).collect(Collectors.toList());
    }

}
