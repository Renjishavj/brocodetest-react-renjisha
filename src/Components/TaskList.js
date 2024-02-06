import React from 'react';

const TaskList = ({ tasks }) => {
  const [expanded, setExpanded] = React.useState(null);

  const handleTaskClick = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - Assigned to: {task.userId}
            <button onClick={() => handleTaskClick(task.id)}>
              View {expanded === task.id ? 'Less' : 'Details'}
            </button>
            {expanded === task.id && (
              <div>
                Status: {task.completed ? 'Completed' : 'Incomplete'}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
