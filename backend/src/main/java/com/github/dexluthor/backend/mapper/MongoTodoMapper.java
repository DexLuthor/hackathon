package com.github.dexluthor.backend.mapper;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import com.github.dexluthor.backend.domain.Todo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SeverityMapper.class, TagMapper.class})
public interface MongoTodoMapper {
    //todo wiring on storage implementation
    MongoTodo fromDomain(Todo domain);

    Todo toDomain(MongoTodo entity);

}
