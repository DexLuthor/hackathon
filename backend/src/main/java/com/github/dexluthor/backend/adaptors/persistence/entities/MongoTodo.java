package com.github.dexluthor.backend.adaptors.persistence.entities;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record MongoTodo(
        ObjectId id,
        String task
) {}
