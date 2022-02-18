package com.github.dexluthor.backend.adaptors.rest;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.ITodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
public class TodoController {

    private final ITodoService todoService;

    @GetMapping
    Flux<Todo> findAll() {
        return todoService.findAll();
    }
}
