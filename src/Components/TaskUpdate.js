import React, { useState, useEffect } from 'react';

const TaskUpdate = ({ taskId, onTaskUpdated }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    userId: '',
    completed: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
   
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then((response) => response.json())
      .then((taskDetails) => {
        setTaskData({
          title: taskDetails.title,
          userId: taskDetails.userId,
          completed: taskDetails.completed,
        });
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
        setError('Error fetching task details. Please try again.');
      });
  }, [taskId]);

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

    
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        
        onTaskUpdated(updatedTask);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        setError('Error updating task. Please try again.');
      });
  };

  return (
    <div>
      <h2>Update Task</h2>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskUpdate;
