package com.github.dexluthor.backend.mapper;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTag;
import com.github.dexluthor.backend.domain.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {
    MongoTag fromDomain(Tag domain);

    Tag toDomain(MongoTag entity);
}
