package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.adaptors.persistence.repos.TodoRepo;
import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.exceptions.TodoNotFoundException;
import com.github.dexluthor.backend.mapper.MongoTodoMapper;
import com.github.dexluthor.backend.mapper.SeverityMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public record TodoServiceImpl(TodoRepo repo, MongoTodoMapper todoMapper,
                              SeverityMapper severityMapper) implements ITodoService {

    @Override
    public Flux<Todo> findAll() {
        return repo.findAll()
                .map(todoMapper::toDomain);
    }

    @Override
    public Mono<Todo> save(final Todo todo) {
        todo.setPublicId(UUID.randomUUID());
        return Mono.just(todo)
                .map(todoMapper::fromDomain)
                .flatMap(repo::save)
                .map(todoMapper::toDomain);
    }

    @Override
    public Mono<Void> delete(final UUID publicId) {
        return findById(publicId)
                .flatMap(todo -> repo.deleteByPublicId(todo.getPublicId()));// todo what if error
    }

    @Override
    public Mono<Todo> findById(final UUID publicId) {
        return repo.findByPublicId(publicId)
                .switchIfEmpty(Mono.error(new TodoNotFoundException(publicId)))
                .map(todoMapper::toDomain);
    }

    @Override
    public Mono<Todo> update(final Todo todo) {
        return repo.findByPublicId(todo.getPublicId())
                .switchIfEmpty(Mono.error(new TodoNotFoundException(todo.getPublicId())))
                .map(entity -> {
                    entity.setDone(todo.isDone());
                    entity.setTask(todo.getTask());
                    entity.setSeverity(severityMapper.toEntity(todo.getSeverity()));
                    entity.setDueDate(todo.getDueDate());
                    return entity;
                })
                .flatMap(repo::save)
                .map(todoMapper::toDomain);
    }

}
