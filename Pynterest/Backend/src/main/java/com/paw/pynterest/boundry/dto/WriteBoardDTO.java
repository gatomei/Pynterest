package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class WriteBoardDTO {

    @NotEmpty(message = "Provide a title for the board")
    @Size(min = 1, max = 200, message = "Title length is too big!")
    private String title;

    @NotNull(message = "Specify if your board is private or not!")
    private Boolean privateBoard;

}
