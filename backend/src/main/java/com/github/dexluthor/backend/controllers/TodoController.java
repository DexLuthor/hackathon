package com.github.dexluthor.backend.controllers;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    Flux<Todo> findAll() {
        return todoService.findAll();
    }
}
