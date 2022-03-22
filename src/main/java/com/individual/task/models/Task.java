package com.individual.task.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Task extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(length=1000, nullable = false)
    private String content;

    public Task(String title, String author, String content){
        this.title = title;
        this.author = author;
        this.content = content;
    }

    public Task(TaskRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.author = requestDto.getAuthor();
        this.content = requestDto.getContent();
    }

    public void update(Task task) {
        this.title = task.title;
        this.author = task.author;
        this.content = task.content;
    }

    public void update(TaskRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.author = requestDto.getAuthor();
        this.content = requestDto.getContent();
    }
}
