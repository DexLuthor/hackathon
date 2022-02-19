package com.github.dexluthor.backend.exceptions;

import org.bson.types.ObjectId;

public class TodoNotFoundException extends RuntimeException {
    public final ObjectId id;//wiring

    public TodoNotFoundException(final ObjectId id) {this.id = id;}
}
