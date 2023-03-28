import { createContext, useState } from 'react';
import tasksData from '../data/TasksData';

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);

  return (
    <TasksContext.Provider value={{ tasks, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
