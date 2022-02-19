package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.adaptors.persistence.repos.TodoRepo;
import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.exceptions.TodoNotFoundException;
import com.github.dexluthor.backend.mapper.MongoTodoMapper;
import org.bson.types.ObjectId;
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

    @Override
    public Mono<Void> delete(final ObjectId id) {
        return findById(id)
                .flatMap(todo -> repo.deleteById(todo.id()));// todo what if error
    }

    @Override
    public Mono<Todo> findById(final ObjectId id) {
        return repo.findById(id)
                .switchIfEmpty(Mono.error(new TodoNotFoundException(id)))
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Todo> update(final Todo todo) {
        return null;
    }

}
