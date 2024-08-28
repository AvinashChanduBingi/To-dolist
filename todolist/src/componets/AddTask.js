import { Button, Container } from "react-bootstrap";
import "./AddTask.css";
import { useState } from "react";

export const AddTask = () => {
  const [formData, setFormData] = useState({
    task: "",
    due: "",
  });

  const addTask = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/Todolist/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text(); 
      console.log("Success:", data);
      alert("Task added successfully!");

      setFormData({ task: "", due: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add task.");
    }
  };

  const dataChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Container className="container">
      <form className="input" onSubmit={addTask}>
        <label>
          Task
        </label>
        <input
            placeholder="ADD TASK"
            onChange={dataChange}
            type="text"
            name="task"
            value={formData.task}
            className="task"
            required
          />
 


 <label>Due Date</label>       
          <input
            onChange={dataChange}
            type="date"
            name="due"
            value={formData.due}
            className="due"
            required
            placeholder="due"
          />
      

        <Button type="submit" className="button">+</Button>
      </form>
    </Container>
  );
};
