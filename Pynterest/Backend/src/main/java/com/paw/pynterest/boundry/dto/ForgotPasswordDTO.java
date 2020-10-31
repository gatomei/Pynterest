package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class ForgotPasswordDTO {
    @NotEmpty(message = "Please provide an email")
    @Email(message = "Please provide a valid email")
    @Size(min=1, max=100, message = "Email should be between 1 and 100 characters")
    private String email;

}
