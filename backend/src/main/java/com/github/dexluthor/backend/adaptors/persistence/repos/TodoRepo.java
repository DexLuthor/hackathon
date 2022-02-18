package com.github.dexluthor.backend.adaptors.persistence.repos;

import com.github.dexluthor.backend.adaptors.persistence.entities.MongoTodo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepo extends ReactiveMongoRepository<MongoTodo, ObjectId> {}
