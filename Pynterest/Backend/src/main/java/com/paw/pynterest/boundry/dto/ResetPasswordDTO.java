package com.paw.pynterest.boundry.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ResetPasswordDTO {

    @NotEmpty(message = "Please provide a password")
    private String newPassword;

    @NotEmpty(message = "Please provide a reset token")
    private String resetToken;

}
