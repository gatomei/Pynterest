package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class WritePanelDTO {

    @NotNull(message = "Provide a userId")
    private Long userId;

    @NotEmpty(message = "Provide a title for the panel")
    @Size(min = 1, max = 200, message = "Title length is too big!")
    private String title;

    @NotNull(message = "Specify if your panel is private or not!")
    private Boolean privatePanel;

}
