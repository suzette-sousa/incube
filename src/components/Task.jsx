import { useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import { parseISO } from 'date-fns';
import { isPast } from 'date-fns';
import { format } from 'date-fns';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { TasksContext } from '../context/TasksContext';

const Task = (props) => {
  const { task } = props;

  const { getTaskToEdit, deleteTask, switchStatus } = useContext(TasksContext);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          {task.duedate && (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {isPast(parseISO(task.duedate)) && !task.completed && <WarningAmberIcon color="error" />} Date d'échéance : {format(parseISO(task.duedate), 'dd/MM/yyyy')}
            </Typography>
          )}
          {task.descr && (
            <Typography variant="body2">
              Description : {task.descr}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <FormControlLabel control={<Switch checked={task.completed} color={task.completed ? "success" : "default"} onChange={() => switchStatus(task.id)} />} label="Terminé" />
          <IconButton color="primary" sx={{ marginLeft: "auto" }} onClick={() => getTaskToEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="add to favorites" onClick={() => deleteTask(task.id)}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default Task;
