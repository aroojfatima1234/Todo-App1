import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Add Task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  // ✅ Delete Task
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // ✅ Update Task
  const updateTask = (i, newText) => {
    const updated = [...tasks];
    updated[i] = newText;
    setTasks(updated);
  };

  return (
    <div className="app">
      <div className="todo-box">
        <h1>To-Do App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Write your task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>+</button>
        </div>

        <p>
          You have {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
        </p>

        <ul>
          {tasks.map((task, index) => (
            <Todo
              key={index}
              task={task}
              index={index}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
