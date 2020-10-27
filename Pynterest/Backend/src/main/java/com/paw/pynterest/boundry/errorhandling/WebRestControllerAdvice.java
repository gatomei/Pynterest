package com.paw.pynterest.boundry.errorhandling;


import com.paw.pynterest.boundry.dto.ErrorDTO;
import com.paw.pynterest.boundry.exceptions.AlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WebRestControllerAdvice {

    @ExceptionHandler(AlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDTO handleAlreadyExists(AlreadyExistsException ex) {
        return this.generateErrorDTO(HttpStatus.BAD_REQUEST, ex);
    }

    private ErrorDTO generateErrorDTO(HttpStatus httpStatus, Exception ex){
        return new ErrorDTO(httpStatus.value(), ex.getMessage());
    }

}