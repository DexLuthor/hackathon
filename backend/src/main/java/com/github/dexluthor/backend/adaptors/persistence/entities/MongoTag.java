package com.github.dexluthor.backend.adaptors.persistence.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tag")
public final class MongoTag {
    private ObjectId id;
    private UUID publicId;
    private String tag;
    private boolean active;

}
