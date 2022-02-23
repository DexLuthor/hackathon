package com.github.dexluthor.backend.adaptors.persistence.repos;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTag;
import org.bson.types.ObjectId;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface TagRepo extends ReactiveCrudRepository<MongoTag, ObjectId> {
    Mono<MongoTag> findByPublicId(UUID publicId);
}
