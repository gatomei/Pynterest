package com.paw.pynterest.boundry.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.paw.pynterest.boundry.CustomValidators.Constraints.PictureConstraint;
import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class WriteUserDTO {

    @NotEmpty(message = "Please provide an email")
    @Email(message = "Please provide a valid e-mail")
    @Size(min=1, max=100, message = "Email should be between 1 and 100 characters")
    private String email;

    @NotEmpty(message = "Please provide an username")
    @Size(min=1, max=100, message = "Username should be between 1 and 100 characters")
    private String username;

    @NotEmpty(message = "Please provide a fullname")
    @Size(min=1, max=100, message = "Full name should be between 1 and 100 characters")
    private String fullname;

    @NotEmpty(message = "Please provide a password")
    @Size(min=1, max=50, message = "Password should be between 1 and 50 characters")
    private String password;

    @Past(message = "Birthdate should be in the past")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthDate;

    @Size(max=500, message = "Description shouldn't be bigger than 500 characters")
    private String description;

    @PictureConstraint(message="The bytes array should be a valid picture")
    private byte[] profilePicture;
}