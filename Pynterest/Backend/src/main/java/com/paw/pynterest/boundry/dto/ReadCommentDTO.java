package com.paw.pynterest.boundry.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadCommentDTO {
    private Long commentId;
    private String username;
    private String content;
}
