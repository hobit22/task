package com.individual.task.controller;

import com.individual.task.models.Task;
import com.individual.task.models.TaskRepository;
import com.individual.task.models.TaskRequestDto;
import com.individual.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;
    private final TaskService taskService;

    @GetMapping("/api/tasks")
    public List<Task> getTasks() {
        return taskRepository.findAllByOrderByModifiedAtDesc();
    }

    @PostMapping("/api/tasks")
    public Task createTasks(@RequestBody TaskRequestDto requestDto) {
        Task task = new Task(requestDto);
//        System.out.println(task);
//        return task;
        return taskRepository.save(task);
    }
    @GetMapping("/api/tasks/{id}")
    public List<Task> getTasksById(@PathVariable Long id) {
        return taskRepository.findAllById(id);
    }

    @PutMapping("/api/tasks/{id}")
    public Long updateTasks(@PathVariable Long id, @RequestBody TaskRequestDto requestDto) {
        return taskService.update(id, requestDto);
    }

    @DeleteMapping("/api/tasks/{id}")
    public Long deleteTasks(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return id;
    }
}
