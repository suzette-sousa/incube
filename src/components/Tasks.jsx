import { useEffect, useState, useContext } from "react";
import Task from "./Task";
import Masonry from '@mui/lab/Masonry';
import AddTask from "./TaskForm";
import Zoom from '@mui/material/Zoom';
import { TasksContext } from '../context/TasksContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Tasks = () => {
  const [loaded, setLoaded] = useState(false);
  const { tasks } = useContext(TasksContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AddTask />

      {!tasks.length && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              Aucune tâche
            </Typography>
          </CardContent>
        </Card>
      )}

      <Zoom in={loaded} style={{ transitionDelay: '100ms' }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3} sx={{ mx: 0 }}>
          {tasks
            .sort((a, b) => new Date(b.duedate) - new Date(a.duedate))
            .map((task) => <Task key={task.id} task={task} />)
          }
        </Masonry>
      </Zoom>
    </>
  );
}

export default Tasks;
