package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.repos.TodoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final ReactiveMongoTemplate c;
    private final TodoRepo repo;

    public Flux<Todo> findAll() {
        return c.findAll(Todo.class).doOnNext(System.out::println);
        // return repo.findAll();
    }

    public Mono<Todo> save(Todo todo) {
        return c.save(todo);
    }

}
