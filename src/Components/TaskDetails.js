import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskDetails = ({ taskId }) => {
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    
    fetch(`http://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then((response) => response.json())
      .then((data) => setTaskDetails(data))
      .catch((error) => console.error('Error fetching task details:', error));
  }, [taskId]);

  if (!taskDetails) {
    return <p>Loading task details...</p>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p>Title: {taskDetails.title}</p>
      <p>Assigned to: {taskDetails.userId}</p>
      <p>Status: {taskDetails.completed ? 'Completed' : 'Incomplete'}</p>
      <Link to="/tasks">Back to Task List</Link>
    </div>
  );
};

export default TaskDetails;
