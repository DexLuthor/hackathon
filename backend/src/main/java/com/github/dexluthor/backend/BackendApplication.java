package com.github.dexluthor.backend;

import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.TodoService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoRepositories
public class BackendApplication {
    //todo separate into modules
    public static void main(String[] args) {
        final var context = SpringApplication.run(BackendApplication.class, args);
        final Todo todo = new Todo();
        todo.content = "stock";
        final TodoService bean2 = context.getBean(TodoService.class);
        bean2.save(todo)
                .doOnNext(x -> System.out.println("saved " + x))
                .doOnError(System.out::println)
                .subscribe();
        bean2.findAll()
                .doOnNext(System.out::println)
                .doOnError(System.out::println)
                .subscribe();
    }

}
