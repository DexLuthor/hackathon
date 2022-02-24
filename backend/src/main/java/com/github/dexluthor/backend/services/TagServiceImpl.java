package com.github.dexluthor.backend.services;

import com.github.dexluthor.backend.adaptors.persistence.repos.TagRepo;
import com.github.dexluthor.backend.domain.Tag;
import com.github.dexluthor.backend.exceptions.TagNotFoundException;
import com.github.dexluthor.backend.mapper.TagMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TagServiceImpl implements ITagService {

    private final TagRepo repo;
    private final TagMapper mapper;

    @Override
    public Flux<Tag> findAll() {
        return repo.findAll().map(mapper::toDomain);
    }

    @Override
    public Mono<Tag> save(final Tag tag) {
        tag.setPublicId(UUID.randomUUID());
        return Mono.just(tag)
                .map(mapper::fromDomain)
                .flatMap(repo::save)
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Void> delete(final UUID publicId) {
        return null;
    }

    @Override
    public Mono<Tag> update(final Tag tag) {
        return repo.findByPublicId(tag.getPublicId())
                .switchIfEmpty(Mono.error(new TagNotFoundException(tag.getPublicId())))
                .flatMap(old -> {
                    old.setTag(tag.getTag());
                    old.setActive(tag.isActive());
                    return repo.save(old);
                })
                .map(mapper::toDomain);
    }
}
