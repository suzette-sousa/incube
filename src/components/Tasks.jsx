import { useEffect, useState, useContext } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { TasksContext } from '../context/TasksContext';
// --- @mui --- //
import Zoom from '@mui/material/Zoom';
import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// --- @mui - end --- //

const Tasks = () => {
  const [loaded, setLoaded] = useState(false);
  const { tasks } = useContext(TasksContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <TaskForm />

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
        <Masonry 
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} 
          spacing={3} 
          sx={{ mx: 0 }}
        >
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
