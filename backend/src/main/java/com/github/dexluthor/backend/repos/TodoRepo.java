package com.github.dexluthor.backend.repos;

import com.github.dexluthor.backend.domain.Todo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepo extends ReactiveMongoRepository<Todo, ObjectId> {
}
