import React from 'react';

import { useMentorTasks } from './hooks/useMentorTasks';

export const Mentor: React.FC = () => {
  const tasks = useMentorTasks();

  if (!tasks) {
    return null;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.id}: {task.completed}
        </li>
      ))}
    </ul>
  );
};