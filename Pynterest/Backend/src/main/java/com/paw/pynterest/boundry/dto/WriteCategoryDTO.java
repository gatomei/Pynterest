package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class WriteCategoryDTO {
    @NotEmpty(message = "Provide a name for the category")
    @Size(min = 1, max = 200, message = "Name length is too big!")
    private String name;
}
