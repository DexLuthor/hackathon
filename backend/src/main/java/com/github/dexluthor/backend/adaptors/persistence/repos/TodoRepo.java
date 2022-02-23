package com.github.dexluthor.backend.adaptors.persistence.repos;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Repository
public interface TodoRepo extends ReactiveMongoRepository<MongoTodo, ObjectId> {
    Mono<MongoTodo> findByPublicId(UUID publicId);

    Mono<Void> deleteByPublicId(UUID publicId);

    @Query("{\"tags.tag\": {\"$in\": ?0}}")
    Flux<MongoTodo> findByTags(List<String> tags);
}
