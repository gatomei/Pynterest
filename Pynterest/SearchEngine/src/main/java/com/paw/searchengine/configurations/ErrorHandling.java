package com.paw.searchengine.configurations;

import com.paw.searchengine.boundry.exceptions.DataAlreadyExists;
import com.paw.searchengine.boundry.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ErrorHandling {

    @ExceptionHandler(DataAlreadyExists.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handlerAlreadyExists(DataAlreadyExists exception)
    {
        return exception.getMessage();
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handlerNotFound(NotFoundException exception)
    {
        return exception.getMessage();
    }
}
