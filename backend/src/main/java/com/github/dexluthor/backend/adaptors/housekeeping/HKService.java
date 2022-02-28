package com.github.dexluthor.backend.adaptors.housekeeping;

import com.github.dexluthor.backend.services.ITodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class HKService {

    private final ITodoService todoService;

    // @Scheduled(cron = "0 * * * 1-7")
    void clean() {
        todoService.deleteTodoOlderThan(LocalDateTime.now())
                .subscribe(x -> log.info("Cleaned"));
    }

}
