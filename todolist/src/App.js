import './App.css';
import { AddTask } from './componets/AddTask';
import { Tasks } from './componets/Tasks';
function App() {
  return (
    <div className="App">
      <diV className="Addtask"><AddTask/></diV>
      <div className='tasks'><Tasks></Tasks></div>
    </div>
  );
}

export default App;
