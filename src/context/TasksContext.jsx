import { createContext, useState } from 'react';
import tasksData from '../data/TasksData';

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);

  const switchStatus = (id) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) return { ...task, completed: !task.completed }
      return { ...task }
    })
    )
  }
  const deleteTask = id => setTasks(tasks => tasks.filter(task => task.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, switchStatus, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
