import React, { useState, useEffect } from 'react';
import TaskDetails from './Components/TaskDetails';
import TaskList from './Components/TaskList';
import TaskCreation from './Components/TaskCreation';
import TaskUpdate from './Components/TaskUpdate';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      {selectedTask ? (
        <>
          <TaskDetails taskId={selectedTask.id} />
          <TaskUpdate taskId={selectedTask.id} onTaskUpdated={handleTaskUpdated} />
        </>
      ) : (
        <>
          <TaskCreation onTaskCreated={handleTaskCreated} />
        </>
      )}
    </div>
  );
};

export default App;
