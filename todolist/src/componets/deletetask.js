export const DeleteTask = async (task1) => {
    try {
      const taskId = parseInt(task1.id, 10);
  
      if (isNaN(taskId)) {
        throw new Error("Task ID is not a valid integer.");
      }
  
      const response = await fetch(`http://localhost:8080/Todolist/delete/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const responseText = await response.text(); 
  
      if (response.ok) {
        alert(responseText); 
      } else {
        throw new Error(responseText); 
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error deleting task");
    }
  };
  