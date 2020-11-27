package com.paw.pynterest.boundry.exceptions;

public class UnauthorizedOperationException extends RuntimeException {
    public UnauthorizedOperationException(String message)
    {
        super(message);
    }
}
