package com.paw.pynterest.boundry.exceptions;

public class UserDoesNotExistException extends RuntimeException {
    public UserDoesNotExistException(String message)
    {
        super(message);
    }
}


