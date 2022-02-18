package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.adaptors.persistence.repos.TodoRepo;
import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.mapper.MongoTodoMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public record TodoServiceImpl(TodoRepo repo, MongoTodoMapper mapper) implements ITodoService {

    @Override
    public Flux<Todo> findAll() {
        return repo.findAll()
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Todo> save(final Todo todo) {
        return Mono.just(todo)
                .map(mapper::fromDomain)
                .flatMap(repo::save)
                .map(mapper::toDomain);
    }

}
