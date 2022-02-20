package com.github.dexluthor.backend.adaptors.rest.controllers;

import com.github.dexluthor.backend.adaptors.persistence.repos.TodoRepo;
import com.github.dexluthor.backend.domain.Todo;
import com.github.dexluthor.backend.services.ITodoService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoControllerTest {
    public static final String BASE_URL = "/api/v1/todo";
    private final Todo todo = new Todo(UUID.randomUUID(), "Finish the project", false);

    @Autowired
    private WebTestClient webClient;
    @Autowired//todo db impl wiring
    private TodoRepo repo;
    @Autowired
    private ITodoService service;

    @BeforeEach
    private void beforeEach() {
        log.debug("Cleaning up todo");
        repo.deleteAll().subscribe();
    }

    @AfterEach
    private void afterEach() {
        log.debug("Cleaning up todo");
        repo.deleteAll().subscribe();
    }

    private Mono<Todo> insertData() {
        return service.save(todo);
    }

    @Test
    @DisplayName("The server is reachable. Should reply with pong")
    void pingPong() {
        webClient
                .get().uri("/actuator/health")
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class).isEqualTo("{\"status\":\"UP\"}");
    }

    @Test
    @DisplayName("Get all returns OK")
    void findAll() {
        webClient
                .get().uri(BASE_URL + "/all")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    @DisplayName("Get by id returns NOT FOUND")
    void findByIdReturnsNotFound() {
        webClient
                .get().uri(BASE_URL + "/" + UUID.randomUUID())
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    @DisplayName("Get by id returns OK")
    void findByIdReturnsOK() {
        insertData().doOnSuccess(savedTodo -> {
            webClient.get().uri(BASE_URL + "/" + savedTodo.getPublicId())
                    .exchange()
                    .expectStatus().isOk();
        }).subscribe();
    }

    @Test
    void save() {
        //given
        final Todo todoToSave = new Todo(null, "Finish the project", false);

        //when
        final WebTestClient.ResponseSpec resp = webClient
                .post().uri(BASE_URL)
                .body(Mono.just(todoToSave), Todo.class)
                .exchange();

        //then
        final Todo responseTodo = resp
                .expectStatus().isOk()
                .expectBody(Todo.class).returnResult().getResponseBody();

        if (responseTodo == null) {
            fail();
        }

        assertThat(responseTodo.isDone()).isFalse();
        assertThat(responseTodo.getPublicId()).isNotNull();
        assertThat(responseTodo.getTask()).isEqualTo("Finish the project");
    }

    @Test
    void delete() {
        insertData().doOnSuccess(savedTodo -> {
            //given
            UUID publicIdToDelete = savedTodo.getPublicId();

            //when
            final WebTestClient.ResponseSpec resp = webClient
                    .delete().uri(BASE_URL + "/" + publicIdToDelete)
                    .exchange();

            //then
            resp
                    .expectStatus().isOk();
        }).subscribe();
    }

    @Test
    void update() {
        insertData().doOnSuccess(savedTodo -> {
            //given
            UUID publicIdToDelete = savedTodo.getPublicId();
            Todo updatedTodo = new Todo(publicIdToDelete, "You make a slogan, call it real.", true);

            //when
            final WebTestClient.ResponseSpec resp = webClient
                    .patch().uri(BASE_URL + "/" + publicIdToDelete)
                    .body(updatedTodo, Todo.class)
                    .exchange();

            //then
            resp
                    .expectStatus().isOk();
        }).subscribe();
    }
}