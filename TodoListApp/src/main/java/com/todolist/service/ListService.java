package com.todolist.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolist.model.TodoListAPP;
import com.todolist.repo.ListRepo;

@Service
public class ListService {

    @Autowired
    private ListRepo repo;

    public boolean addTask(TodoListAPP todoList) {
        try {
            todoList.setComplete(false);
            TodoListAPP savedTask = repo.save(todoList);
            return savedTask != null;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<TodoListAPP> getData(LocalDate date) {
        try {
            List<TodoListAPP> list = repo.findByDue(date);
            return list != null ? list : Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
    
    public void update(TodoListAPP app)
    {
    	 repo.save(app);
    }
    
    public void delete(Integer id)
    {
    	repo.deleteById(id);
    }
    public void complete(TodoListAPP app)
    {
    	repo.save(app);
    }
}
