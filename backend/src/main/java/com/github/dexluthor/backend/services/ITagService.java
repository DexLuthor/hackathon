package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.domain.Tag;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ITagService {

    Flux<Tag> findAll();

    Mono<Tag> save(Tag tag);

    Mono<Void> delete(UUID publicId);

    Mono<Tag> update(Tag tag);

}
