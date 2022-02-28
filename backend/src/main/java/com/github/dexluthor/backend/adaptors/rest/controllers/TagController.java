package com.github.dexluthor.backend.adaptors.rest.controllers;

import com.github.dexluthor.backend.domain.Tag;
import com.github.dexluthor.backend.services.ITagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "api/v1/tags")
public class TagController {
    private final ITagService tagService;

    @GetMapping("all")
    Flux<Tag> findAll() {
        return tagService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Mono<Tag> save(@RequestBody Tag tag) {//todo replace with dto
        return tagService.save(tag);
    }

    @PatchMapping
    Mono<Tag> update(@RequestBody Tag tag) {//todo replace with dto
        return tagService.update(tag);
    }

    // @DeleteMapping("delete/{publicId}")
    // Mono<Void> delete(@PathVariable UUID publicId) {
    //     return tagService.delete(publicId);
    // }
}
