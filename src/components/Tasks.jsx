import { useEffect, useState, useContext } from "react";
import Task from "./Task";
import Masonry from '@mui/lab/Masonry';
import AddTask from "./AddTask";
import Zoom from '@mui/material/Zoom';
import { TasksContext } from '../context/TasksContext';

const Tasks = () => {
  const [loaded, setLoaded] = useState(false);
  const { tasks } = useContext(TasksContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AddTask />

      <Zoom in={loaded} style={{ transitionDelay: '100ms' }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3} sx={{ mx: 0 }}>
          {tasks.map((task) => <Task key={task.id} task={task} />)}
        </Masonry>
      </Zoom>
    </>
  );
}

export default Tasks;
