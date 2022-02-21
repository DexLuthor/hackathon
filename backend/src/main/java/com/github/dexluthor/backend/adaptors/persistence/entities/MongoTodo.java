package com.github.dexluthor.backend.adaptors.persistence.entities;

import com.github.dexluthor.backend.adaptors.persistence.values.Severity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "todo")
@Data
@AllArgsConstructor
@NoArgsConstructor
public final class MongoTodo {
    private ObjectId id;
    private UUID publicId;
    private String task;
    private boolean isDone;
    private Severity severity;
}
