package com.github.dexluthor.backend.domain;

import org.bson.types.ObjectId;

// todo wiring with ObjectId
public record Todo(ObjectId id, String task) {}
