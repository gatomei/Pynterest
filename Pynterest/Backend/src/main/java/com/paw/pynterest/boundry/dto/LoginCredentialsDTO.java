package com.paw.pynterest.boundry.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginCredentialsDTO {
    private String email;
    private String password;
}