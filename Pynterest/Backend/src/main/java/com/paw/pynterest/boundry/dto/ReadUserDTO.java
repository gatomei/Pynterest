package com.paw.pynterest.boundry.dto;

import lombok.Data;

import java.util.Date;
@Data
public class ReadUserDTO {
    private String email;

    private String username;

    private String fullname;

    private Date birthDate;

    private String description;

    private byte[] profilePicture;

    private Integer numberFollowers;

    private Integer numberFollowings;
}