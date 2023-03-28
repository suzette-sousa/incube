import { createContext, useState } from 'react';
import tasksData from '../data/TasksData';

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const addTask = addedTask => setTasks([{ ...addedTask }, ...tasks]);

  const getTaskToEdit = task => setTaskToEdit(task);

  const resetTaskToEdit = task => setTaskToEdit(null);

  const updateTask = updatedTask => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === updatedTask.id) return { ...updatedTask }
      return { ...task }
    }))
  }

  const switchStatus = id => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) return { ...task, completed: !task.completed }
      return { ...task }
    }))
  }

  const deleteTask = id => setTasks(tasks => tasks.filter(task => task.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, getTaskToEdit, taskToEdit, resetTaskToEdit, updateTask, switchStatus, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
