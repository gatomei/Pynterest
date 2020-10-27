package com.paw.pynterest.boundry.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDTO {
    private int statusCode;

    private String message;
}