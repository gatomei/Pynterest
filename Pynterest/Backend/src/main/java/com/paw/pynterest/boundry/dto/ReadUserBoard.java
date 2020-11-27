package com.paw.pynterest.boundry.dto;

import lombok.Data;

@Data
public class ReadUserBoard {
    private Long boardId;
    private String title;
    private byte[] firstPicture;
    private Integer numberOfPictures;
    private Boolean privateBoard;
}
