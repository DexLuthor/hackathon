package com.github.dexluthor.backend.adaptors.rest.middleware;

import com.github.dexluthor.backend.exceptions.TodoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice extends AbstractExceptionHandler {

    @ExceptionHandler(TodoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ApiError internalServerError(TodoNotFoundException e) {
        logError(e.getMessage());
        return new ApiError("Resource server error", e.getMessage());//todo wrong message
    }

}
