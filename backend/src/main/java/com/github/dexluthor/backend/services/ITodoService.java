package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.domain.Todo;
import org.bson.types.ObjectId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ITodoService {
    Flux<Todo> findAll();

    Mono<Todo> save(Todo todo);

    Mono<Void> delete(ObjectId id);

    Mono<Todo> findById(ObjectId id);

    Mono<Todo> update(Todo todo);
}
