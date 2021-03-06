package com.paw.pynterest.boundry.errorhandling;

import com.paw.pynterest.boundry.dto.ErrorDTO;
import com.paw.pynterest.boundry.exceptions.*;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class WebRestControllerAdvice {

    private ErrorDTO generateErrorDTO(HttpStatus httpStatus, Exception ex) {
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

    @ExceptionHandler(UnauthorizedOperationException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleUnauthorizedOperation(UnauthorizedOperationException ex) {
        return this.generateErrorDTO(HttpStatus.UNAUTHORIZED, ex);
    }

    @ExceptionHandler(IncorrectTokenException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleIncorrectToken(IncorrectTokenException ex) {
        return this.generateErrorDTO(HttpStatus.UNAUTHORIZED, ex);
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorDTO handleNotFound(NotFoundException ex) {
        return this.generateErrorDTO(HttpStatus.NOT_FOUND, ex);
    }

    @ExceptionHandler(InvalidResetTokenException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDTO handleInvalidResetToken(InvalidResetTokenException ex) {
        return this.generateErrorDTO(HttpStatus.BAD_REQUEST, ex);
    }

    @ExceptionHandler(ServerErrorException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleInternalServerError(ServerErrorException ex) {
        return this.generateErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, ex);
    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDTO handleUniqueKeyViolation(DataIntegrityViolationException ex) {
        return this.generateErrorDTO(HttpStatus.BAD_REQUEST, ex);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    protected ErrorDTO handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        //Get all errors
        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" , "));

        return this.generateErrorDTO(HttpStatus.BAD_REQUEST, new Exception(errors));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO defaultHandler(Exception ex) {
        return this.generateErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, ex);
    }
}