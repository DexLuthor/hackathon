package com.github.dexluthor.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public final class Tag {
    private UUID publicId;
    private String tag;
    private boolean active;
}
