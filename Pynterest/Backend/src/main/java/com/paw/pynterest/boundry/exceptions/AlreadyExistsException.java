package com.paw.pynterest.boundry.exceptions;

public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String message)
    {
        super(message);
    }
}
