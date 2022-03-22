package com.individual.task.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class TaskRequestDto {
    private final String title;
    private final String author;
    private final String content;
}
