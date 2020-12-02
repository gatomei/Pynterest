package com.paw.pynterest.boundry.dto;

import lombok.Getter;

import javax.validation.constraints.Size;

@Getter
public class WriteCommentDTO {
    @Size(max = 400, message = "Comment must have maximum 400 characters")
    private String content;
}
