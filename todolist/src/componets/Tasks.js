import { Container, Card } from "react-bootstrap";
import "./Tasks.css";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { Edit } from "./Edits";
import { DeleteTask } from "./deletetask";
import { Done } from "./Taskcompletion";

export const Tasks = () => {
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const getdatabydate = async (event) => {
    const date = event.target.value;
    setDate(date);
    await updateTasks(date);
  };

  const updateTasks = async (date) => {
    try {
      const response = await fetch(`http://localhost:8080/Todolist/dataOfDate/${date}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);  // Update the state with the fetched tasks
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to retrieve data.");
    }
  };

  return (
    <Container className="allTasks">
      <div className="date-picker">
        <label>Select date: </label>
        <input name="due" type="date" onChange={getdatabydate} />
      </div>
      <div className="tasksdisplay">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="task-card">
              <p>{task.task}</p>
              <p>{task.complete && "completed"}</p>
              <div className="icons">
                <FaEdit
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await Edit(task);  // Await completion of the edit action
                    await updateTasks(task.due);  // Refresh the tasks
                  }}
                />
                <TiTick
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await Done(task);  // Await completion of marking the task as done
                    await updateTasks(task.due);  // Refresh the tasks
                  }}
                />
                <MdDeleteForever
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await DeleteTask(task);  // Await completion of the delete action
                    await updateTasks(task.due);  // Refresh the tasks
                  }}
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};
