package com.individual.task.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByTitle(String title);
    List<Task> findByAuthor(String author);
    List<Task> findByContentLike(String content);
    List<Task> findAllById(Long id);

    List<Task> findAllByOrderByModifiedAtDesc();
}
