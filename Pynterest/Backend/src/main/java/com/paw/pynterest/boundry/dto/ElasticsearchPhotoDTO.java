package com.paw.pynterest.boundry.dto;

import lombok.Data;

@Data
public class ElasticsearchPhotoDTO {
    private Long photoId;
    private String title;
    private String description;
}
