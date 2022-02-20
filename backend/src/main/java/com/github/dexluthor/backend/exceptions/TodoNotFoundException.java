package com.github.dexluthor.backend.exceptions;

import java.util.UUID;

public class TodoNotFoundException extends RuntimeException {
    public final UUID publicId;

    public TodoNotFoundException(final UUID publicId) {this.publicId = publicId;}
}
