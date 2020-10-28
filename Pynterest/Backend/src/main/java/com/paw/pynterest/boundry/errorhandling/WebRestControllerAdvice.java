package com.paw.pynterest.boundry.errorhandling;

import com.paw.pynterest.boundry.dto.ErrorDTO;
import com.paw.pynterest.boundry.exceptions.AlreadyExistsException;
import com.paw.pynterest.boundry.exceptions.IncorrectTokenException;
import com.paw.pynterest.boundry.exceptions.MissingTokenException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WebRestControllerAdvice {

    private ErrorDTO generateErrorDTO(HttpStatus httpStatus, Exception ex){
        return new ErrorDTO(httpStatus.value(), ex.getMessage());
    }

    @ExceptionHandler(AlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDTO handleAlreadyExists(AlreadyExistsException ex) {
        return this.generateErrorDTO(HttpStatus.BAD_REQUEST, ex);
    }

    @ExceptionHandler(MissingTokenException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleMissingToken(MissingTokenException ex) {
        return this.generateErrorDTO(HttpStatus.UNAUTHORIZED, ex);
    }

    @ExceptionHandler(IncorrectTokenException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleIncorrectToken(IncorrectTokenException ex) {
        return this.generateErrorDTO(HttpStatus.UNAUTHORIZED, ex);
    }

}