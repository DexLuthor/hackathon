package com.github.dexluthor.backend.adaptors.persistence.entities;

import com.github.dexluthor.backend.adaptors.persistence.values.Severity;
import com.github.dexluthor.backend.domain.Todo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
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
    private LocalDateTime dueDate;
    private List<Todo> subtodos;
    private List<MongoTag> tags;

    @CreatedDate
    private LocalDateTime creationDate;

}
