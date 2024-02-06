import React, { useState } from 'react';

const TaskCreation = ({ onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    userId: '',
    completed: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!taskData.title || !taskData.userId) {
      setError('Please fill out all fields.');
      return;
    }

    
    setError('');

    
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((newTask) => {
        
        onTaskCreated(newTask);
        
        setTaskData({
          title: '',
          userId: '',
          completed: false,
        });
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        setError('Error creating task. Please try again.');
      });
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Assigned User:
          <input
            type="text"
            name="userId"
            value={taskData.userId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="completed"
            value={taskData.completed}
            onChange={handleChange}
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskCreation;
