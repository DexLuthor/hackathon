package com.github.dexluthor.backend.mapper;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import com.github.dexluthor.backend.domain.Todo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MongoTodoMapper {
    //todo wiring on storage implementation
    MongoTodo fromDomain(Todo background);

    Todo toDomain(MongoTodo entity);

}