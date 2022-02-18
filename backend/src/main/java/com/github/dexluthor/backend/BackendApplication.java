package com.github.dexluthor.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoRepositories
public class BackendApplication {
    //todo separate into modules
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
