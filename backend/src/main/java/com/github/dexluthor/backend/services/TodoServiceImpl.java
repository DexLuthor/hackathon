package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTag;
import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import com.github.dexluthor.backend.adaptors.persistence.repos.TagRepo;
import com.github.dexluthor.backend.adaptors.persistence.repos.TodoRepo;
import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.exceptions.TodoNotFoundException;
import com.github.dexluthor.backend.mapper.MongoTodoMapper;
import com.github.dexluthor.backend.mapper.SeverityMapper;
import com.github.dexluthor.backend.mapper.TagMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class TodoServiceImpl implements ITodoService {
    private final TodoRepo todoRepo;
    private final MongoTodoMapper todoMapper;
    private final SeverityMapper severityMapper;
    private final TagMapper tagMapper;
    private final TagRepo tagRepo;

    @Override
    public Flux<Todo> findAll() {
        return tagRepo.findAll()
                .collectList()
                .flatMapMany(tags -> {
                    if (tags.isEmpty() || tags.stream().noneMatch(MongoTag::isActive)) {
                        return todoRepo.findAll();
                    } else {
                        final List<String> activeTags = tags.stream()
                                .filter(MongoTag::isActive)
                                .map(MongoTag::getTag)
                                .collect(toList());
                        return todoRepo.findByTags(activeTags);
                    }
                })
                .map(todoMapper::toDomain);
    }

    @Override
    public Mono<Todo> save(final Todo newTodo) {
        if (newTodo.getPublicId() != null) {
            return todoRepo.findByPublicId(newTodo.getPublicId())
                    .switchIfEmpty(Mono.error(new TodoNotFoundException(newTodo.getPublicId())))
                    .map(oldTodo -> updateEntity(oldTodo, newTodo))
                    .flatMap(todoRepo::save)
                    .map(todoMapper::toDomain);
        } else {
            newTodo.setPublicId(UUID.randomUUID());
            return Mono.just(newTodo)
                    .map(todoMapper::fromDomain)
                    .flatMap(todoRepo::save)
                    .map(todoMapper::toDomain);
        }
    }

    @Override
    public Mono<Void> delete(final UUID publicId) {
        return findById(publicId)
                .flatMap(todo -> todoRepo.deleteByPublicId(todo.getPublicId()));// todo what if error
    }

    @Override
    public Mono<Todo> findById(final UUID publicId) {
        return todoRepo.findByPublicId(publicId)
                .switchIfEmpty(Mono.error(new TodoNotFoundException(publicId)))
                .map(todoMapper::toDomain);
    }

    @Override
    public Mono<Todo> update(final Todo newTodo) {
        return todoRepo.findByPublicId(newTodo.getPublicId())
                .switchIfEmpty(Mono.error(new TodoNotFoundException(newTodo.getPublicId())))
                .map(oldTodo -> updateEntity(oldTodo, newTodo))
                .flatMap(todoRepo::save)
                .map(todoMapper::toDomain);
    }

    private MongoTodo updateEntity(final MongoTodo oldTodo, final Todo newTodo) {
        addIdsToNewSubtodos(newTodo);

        oldTodo.setDone(newTodo.isDone());
        oldTodo.setTask(newTodo.getTask());
        oldTodo.setSeverity(severityMapper.toEntity(newTodo.getSeverity()));
        oldTodo.setDueDate(newTodo.getDueDate());
        oldTodo.setSubtodos(newTodo.getSubtodos());
        oldTodo.setTags(newTodo.getTags().stream().map(tagMapper::fromDomain).collect(toList()));
        return oldTodo;
    }

    private void addIdsToNewSubtodos(final Todo newTodo) {
        if (newTodo.getSubtodos() == null) {
            return;
        }

        for (final Todo subtodo : newTodo.getSubtodos()) {
            if (subtodo.getPublicId() == null) {
                subtodo.setPublicId(UUID.randomUUID());
            }
        }
    }

}
