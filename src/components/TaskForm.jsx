import { useState, useContext, useEffect } from "react";
import { TasksContext } from '../context/TasksContext';
import uuid from 'react-uuid';
import { formatISO, format, parseISO } from 'date-fns';
import dayjs from 'dayjs';
// --- @mui --- //
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { DateField } from '@mui/x-date-pickers/DateField';
import Fab from '@mui/material/Fab';
// --- @mui - end --- //

const TaskForm = () => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescr, setTaskDescr] = useState("");
  const [taskDuedate, setTaskDuedate] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [error, setError] = useState(false);

  const { addTask, taskToEdit, resetTaskToEdit, updateTask } = useContext(TasksContext);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    // To aplly initial state after transition modal
    setTimeout(() => {
      setError(false);
      setTaskName("");
      setTaskDescr("");
      setTaskDuedate("");
      setTaskCompleted(false);
      if (taskToEdit) resetTaskToEdit();
    }, "100");
  }

  const handleSubmit = () => {
    if (!taskName) {
      setError(true);
      return false;
    }

    const taskToSubmit = {
      id: taskToEdit ? taskToEdit.id : uuid(),
      name: taskName,
      descr: taskDescr,
      duedate: taskDuedate,
      completed: taskCompleted
    };
    taskToEdit ? updateTask(taskToSubmit) : addTask(taskToSubmit);
    handleClose();
  }

  useEffect(() => {
    if (taskToEdit) {
      setOpen(true);
      setTaskName(taskToEdit.name);
      setTaskDescr(taskToEdit?.descr);
      setTaskDuedate(taskToEdit?.duedate ? format(parseISO(taskToEdit?.duedate), 'yyyy-MM-dd') : "");
      setTaskCompleted(taskToEdit.completed);
    }
  }, [taskToEdit]);

  return (
    <>
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: "fixed", bottom: 30, right: 30 }} 
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        sx={{ "& .MuiDialog-paper": { width: "100%" } }}
      >
        <DialogTitle>{taskToEdit ? "Éditer la tâche" : "Ajouter une tâche"}</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={taskDescr}
            onChange={(e) => setTaskDescr(e.target.value)}
          />
          <DateField
            margin="dense"
            label="Date d'échéance"
            value={taskDuedate?.length ? dayjs(taskDuedate) : null}
            onChange={(e) => setTaskDuedate(formatISO(new Date(e)))}
            format="DD-MM-YYYY"
          />
          {error && <Alert severity="error">Le nom est obligatoire</Alert>}
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={handleClose} 
            variant="outlined"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
          >
              {taskToEdit ? "Éditer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskForm;
