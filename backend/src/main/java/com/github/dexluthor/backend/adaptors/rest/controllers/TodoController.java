package com.github.dexluthor.backend.adaptors.rest.controllers;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.ITodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "api/v1/todo")
public class TodoController {

    private final ITodoService todoService;

    @GetMapping("all")
    Flux<Todo> findAll() {
        return todoService.findAll();//todo when list is empty  empty result will be returned
    }

    @GetMapping("{publicId}")
    Mono<Todo> findById(@PathVariable UUID publicId) {//todo wiring
        return todoService.findById(publicId);
    }

    @PostMapping
    Mono<Todo> save(@RequestBody Todo todo) {//todo replace with dto
        return todoService.save(todo);
    }

    @DeleteMapping("delete/{publicId}")
    Mono<Void> delete(@PathVariable UUID publicId) {
        return todoService.delete(publicId);
    }

    @PatchMapping
    Mono<Todo> update(@RequestBody Todo todo) {
        return todoService.update(todo);
    }
}
