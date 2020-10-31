package com.paw.pynterest.boundry.exceptions;

public class InvalidResetTokenException extends RuntimeException {

    public InvalidResetTokenException(String message)
    {
        super(message);
    }
}