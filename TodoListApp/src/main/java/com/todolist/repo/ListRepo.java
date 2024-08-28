package com.todolist.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.model.TodoListAPP;

public interface ListRepo extends JpaRepository<TodoListAPP, Integer> {
	
	List<TodoListAPP> findByDue(LocalDate due);

}
