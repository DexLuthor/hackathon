package com.github.dexluthor.backend.domain;

import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@ToString
public class Todo {
    public String content;
    ObjectId id;

}
