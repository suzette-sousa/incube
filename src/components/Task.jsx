import { useContext } from "react";
import { TasksContext } from '../context/TasksContext';
import { parseISO, isPast, format } from 'date-fns';
// --- @mui --- //
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// --- @mui - end --- //

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
              {isPast(parseISO(task.duedate)) && !task.completed && (
                <WarningAmberIcon 
                  color="error" 
                  fontSize="small" 
                  sx={{ verticalAlign: "middle" }} 
                />
              )}
              {" "}Date d'échéance : {format(parseISO(task.duedate), 'dd/MM/yyyy')}
            </Typography>
          )}
          {task.descr && <Typography variant="body2">Description : {task.descr}</Typography>}
        </CardContent>
        
        <CardActions>
          <FormControlLabel 
            control={
              <Switch 
                checked={task.completed} 
                color={task.completed ? "success" : "default"} 
                onChange={() => switchStatus(task.id)} 
              />} 
            label="Terminé" 
          />
          <IconButton 
            color="primary" 
            sx={{ marginLeft: "auto" }} 
            onClick={() => getTaskToEdit(task)}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            onClick={() => deleteTask(task.id)}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default Task;
