package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.domain.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ITodoService {
    Flux<Todo> findAll();

    Mono<Todo> save(Todo todo);

    Mono<Void> delete(UUID publicId);

    Mono<Todo> findById(UUID publicId);

    Mono<Todo> update(Todo todo);
}
