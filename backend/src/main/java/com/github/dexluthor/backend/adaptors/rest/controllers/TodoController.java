package com.github.dexluthor.backend.adaptors.rest.controllers;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.ITodoService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "api/v1/todo")
public class TodoController {

    private final ITodoService todoService;

    @GetMapping("all")
    Flux<Todo> findAll() {
        return todoService.findAll();
    }

    @GetMapping("{id}")
    Mono<Todo> findById(@PathVariable ObjectId id) {//todo wiring
        return todoService.findById(id);
    }

    @PostMapping
    Mono<Todo> save(@RequestBody Todo todo) {//todo replace with dto
        return todoService.save(todo);
    }

    @DeleteMapping("delete/{id}")
    Mono<Void> delete(@PathVariable ObjectId id) {
        return todoService.delete(id);
    }

    @PatchMapping
    Mono<Todo> update(@RequestBody Todo todo) {
        return todoService.update(todo);
    }
}
