package com.github.dexluthor.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

// todo wiring with ObjectId
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private UUID publicId;
    private String task;
    private boolean isDone;
    private Severity severity;
    private LocalDateTime dueDate;
    private List<Todo> subtodos;
    private List<Tag> tags;
}
