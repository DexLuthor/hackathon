package com.github.dexluthor.backend.exceptions;

import java.util.UUID;

public class TagNotFoundException extends RuntimeException {
    public TagNotFoundException(final UUID publicId) {
        super("Cant find tag with id " + publicId);
    }
}
