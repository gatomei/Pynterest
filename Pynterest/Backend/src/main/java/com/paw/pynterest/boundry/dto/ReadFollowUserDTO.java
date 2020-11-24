package com.paw.pynterest.boundry.dto;

import lombok.Data;

@Data
public class ReadFollowUserDTO {
    private String username;
    private byte[] profilePicture;
}
