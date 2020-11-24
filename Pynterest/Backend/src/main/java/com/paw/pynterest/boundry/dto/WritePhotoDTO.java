package com.paw.pynterest.boundry.dto;

import com.paw.pynterest.boundry.CustomValidators.Constraints.PictureConstraint;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class WritePhotoDTO {
    @NotNull(message = "Provide a userId")
    private Long userId;

    @NotNull(message = "Provide a title for the board")
    @Size(min = 1, max = 100, message = "Title length is too big!")
    private String title;

    @Size(min = 1, max = 500, message = "Description length is too big!")
    private String description;

    @NotNull(message = "Provide a category for the board")
    @Size(min = 1, max = 100, message = "Category length is too big!")
    private String categoryName;

    @PictureConstraint(message="The bytes array should be a valid picture")
    private byte[] pictureData;


}
