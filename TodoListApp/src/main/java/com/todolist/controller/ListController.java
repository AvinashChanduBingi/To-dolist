package com.todolist.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.model.TodoListAPP;
import com.todolist.service.ListService;


@RestController
@RequestMapping("/Todolist")
@CrossOrigin(origins = "http://localhost:3000")
public class ListController {

    private final ListService service;

    @Autowired
    public ListController(ListService service) {
        this.service = service;
    }

    @PostMapping("/addtask")
    public ResponseEntity<String> addTask(@RequestBody TodoListAPP entity) {
        boolean res = service.addTask(entity);
        if (res) {
            return new ResponseEntity<>("Task created successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Task creation failed", HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/dataOfDate/{date}")
    public ResponseEntity<List<TodoListAPP>> dataByDate(@PathVariable String date) {
        try {
            LocalDate dueDate = LocalDate.parse(date); 
            List<TodoListAPP> list = service.getData(dueDate);
            return ResponseEntity.ok(list); 
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); 
        }
    }
    
    @PutMapping("/editTask")
    public ResponseEntity<TodoListAPP> Edit(@RequestBody TodoListAPP entity) {
       try
       {
    	   service.update(entity);
           return ResponseEntity.ok(entity); 
       }
       catch(Exception e)
       {
    	   System.out.println("hello");
    	   return ResponseEntity.badRequest().body(null);    
       }
        
        
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id)
    {
    	try
    	{
    		service.delete(id);
    		return new ResponseEntity<String>("Deleted",HttpStatus.ACCEPTED);
    	}
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Error",HttpStatus.BAD_REQUEST);
    	}
    }
    @PutMapping("/complete")
    public ResponseEntity<TodoListAPP> complete(@RequestBody TodoListAPP entity) {
       try
       {
    	   entity.setComplete(true);
    	   service.complete(entity);
           return ResponseEntity.ok(entity); 
       }
       catch(Exception e)
       {
    	   System.out.println("hello");
    	   return ResponseEntity.badRequest().body(null);    
       }
        
        
    }
}
