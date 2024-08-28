export const Edit = async (task1) => {
    
    let task = prompt("Enter task description:", task1.task); 
    let dateInput = prompt("Enter a date (YYYY-MM-DD):",task1.due);
    const date = new Date(dateInput);

    if (!isNaN(date.getTime())) {
        console.log("Selected date:", date);
    } else {
        alert("Invalid date format. Please enter in YYYY-MM-DD format.");
        return; 
    }

    
    task1.task = task;
    task1.due = dateInput;

    try {
        
        const response = await fetch("http://localhost:8080/Todolist/editTask", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task1)
        });

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR: ${response.status}`);
        }

        const data = await response.text();
        alert("Update successful"); 
    } catch (error) {
        alert("Update failed"); 
    }
}
