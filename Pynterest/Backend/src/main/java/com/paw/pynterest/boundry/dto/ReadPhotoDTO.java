package com.paw.pynterest.boundry.dto;

import lombok.Data;
@Data
public class ReadPhotoDTO {
    private Long photoId;
    private String username;
    private String title;
    private String description;
    private String path;
    private Long categoryId;
    private byte[] pictureData;
}
