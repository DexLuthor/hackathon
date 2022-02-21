package com.github.dexluthor.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
