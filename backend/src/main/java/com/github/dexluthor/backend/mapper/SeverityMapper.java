package com.github.dexluthor.backend.mapper;

import com.github.dexluthor.backend.domain.Severity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SeverityMapper {
    Severity toDomain(com.github.dexluthor.backend.adaptors.persistence.values.Severity entity);

    com.github.dexluthor.backend.adaptors.persistence.values.Severity toEntity(Severity entity);
}
