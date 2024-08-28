export const Done= async(task1)=>
{
    try {
      
        
        const response = await fetch(`http://localhost:8080/Todolist/complete`, {
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