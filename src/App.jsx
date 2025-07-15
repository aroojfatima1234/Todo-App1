import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Add Task
  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  // ✅ Delete Task
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // ✅ Start editing
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
    setIsModalOpen(true);
  };

  // ✅ Update Task
  const handleUpdate = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editValue;
    setTasks(updatedTasks);
    closeModal();
  };

  // ✅ Cancel edit
  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setEditValue('');
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

        <p>You have {tasks.length} Task{tasks.length !== 1 ? 's' : ''}</p>

        <ul>
          {tasks.map((task, index) => (
          <Todo
           key={index}
           task={task}
           index={index}
           onDelete={deleteTask}
           onUpdate={(i, newText) => {
           const updated = [...tasks];
           updated[i] = newText;
           setTasks(updated);
          }}
          />

          ))}
        </ul>
        {/* ✅ Edit Modal */}
        {isModalOpen && (
          <>
            <div className="modal-backdrop"></div>
            <div className="custom-modal">
              <h4>Edit Task</h4>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="update-btn" onClick={handleUpdate}>Update</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
