package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.domain.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ITodoService {
    Flux<Todo> findAll();

    Mono<Todo> save(Todo todo);

    Mono<Void> deleteById(UUID publicId);

    Mono<Void> deleteTodoOlderThan(LocalDateTime dateTime);

    Mono<Todo> findById(UUID publicId);

    Mono<Todo> update(Todo todo);
}
