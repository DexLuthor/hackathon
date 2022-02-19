package com.github.dexluthor.backend.adaptors.rest.middleware;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractExceptionHandler {
    protected static void logError(String msg) {
        logError(msg, null);
    }

    protected static void logError(String msg, Throwable t) {
        log.error(msg, t);
    }

    @Data
    public static class ApiError {
        protected final String error;
        protected final String message;
    }
}