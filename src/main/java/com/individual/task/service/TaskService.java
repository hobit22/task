package com.individual.task.service;

import com.individual.task.models.Task;
import com.individual.task.models.TaskRepository;
import com.individual.task.models.TaskRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service // 스프링에게 이 클래스는 서비스임을 명시
public class TaskService {

    // final: 서비스에게 꼭 필요한 녀석임을 명시
    private final TaskRepository taskRepository;

    @Transactional // SQL 쿼리가 일어나야 함을 스프링에게 알려줌
    public Long update(Long id, TaskRequestDto requestDto) {
        Task task1 = taskRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
        );
        task1.update(requestDto);
        return task1.getId();
    }
}