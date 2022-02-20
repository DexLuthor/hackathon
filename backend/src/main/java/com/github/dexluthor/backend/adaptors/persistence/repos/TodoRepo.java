package com.github.dexluthor.backend.adaptors.persistence.repos;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface TodoRepo extends ReactiveMongoRepository<MongoTodo, ObjectId> {
    Mono<MongoTodo> findByPublicId(UUID publicId);

    Mono<Void> deleteByPublicId(UUID publicId);
}
