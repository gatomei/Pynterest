package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class UserDTO {
    private Long userId;

    @NotNull(message = "Email shouldn't be null")
    @Email(message = "Email should be valid")
    @Size(min=1, max=100, message = "Username should be between 1 and 100 characters")
    private String email;

    @NotNull(message = "Username shouldn't be null")
    @Size(min=1, max=100, message = "Username should be between 1 and 100 characters")
    private String username;

    @NotNull(message = "Full name shouldn't be null")
    @Size(min=1, max=100, message = "Full name should be between 1 and 100 characters")
    private String fullname;

    @NotNull(message = "Password shouldn't be null")
    @Size(min=1, max=50, message = "Password should be between 1 and 50 characters")
    private String password;

    @NotNull(message = "Admin shouldn't be null")
    private Boolean admin;

    @Past(message = "Birthdate should be in the past")
    private Date birthDate;

    @Size(max=500, message = "Description shouldn't be bigger than 500 characters")
    private String description;
}
