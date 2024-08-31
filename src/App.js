// src/App.js
import React, { useState,useEffect } from 'react';
import './App.css';
function App() {
  const [todos, setTodos] = useState(() => {
    // Retrieve stored todos or initialize with an empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    // Store todos in local storage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput(''); // Clear input after adding
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-form">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className="todo-text">{todo.text}</span>
            <button className="remove-button" onClick={() => removeTodo(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

