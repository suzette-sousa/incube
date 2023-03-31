import { useContext } from "react";
import { TasksContext } from '../context/TasksContext';
import { parseISO, isPast, format } from 'date-fns';
// --- @mui --- //
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Divider } from "@mui/material";
// --- @mui - end --- //

const Task = (props) => {
  const { task } = props;

  const { getTaskToEdit, deleteTask, switchStatus } = useContext(TasksContext);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "600" }}>
            {task.name}
          </Typography>
          {task.duedate && (
            <Typography variant="body2" sx={{ mb: 2, maxHeight: "1.2rem", color: "#999" }}>
              {isPast(parseISO(task.duedate)) && !task.completed && (
                <WarningAmberIcon 
                  color="error" 
                  fontSize="small" 
                  sx={{ verticalAlign: "middle" }} 
                />
              )}
              {" "}À finir avant le {format(parseISO(task.duedate), 'dd/MM/yyyy')}
            </Typography>
          )}
          {task.descr && (
            <>
              <Typography variant="body2" sx={{ mb: 1, mt: 3, fontWeight: "600" }}>Instructions :</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{task.descr}</Typography>
            </>
          )}
        </CardContent>
        
        <Divider />
        
        <CardActions
          sx={{ backgroundColor: "#f2f8ff"}}
        >
          <FormControlLabel 
            control={
              <Switch 
                checked={task.completed} 
                color={task.completed ? "secondary" : "default"} 
                onChange={() => switchStatus(task.id)} 
              />} 
            label="Terminé" 
            labelPlacement="start"
          />
          <IconButton 
            sx={{ marginLeft: "auto" }}
            onClick={() => deleteTask(task.id)}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
          <Button 
            size="small"
            variant="contained" 
            endIcon={<EditIcon />}
            onClick={() => getTaskToEdit(task)}
          >
            Éditer
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Task;
