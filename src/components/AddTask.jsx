import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { DateField } from '@mui/x-date-pickers/DateField';
import Fab from '@mui/material/Fab';
import { TasksContext } from '../context/TasksContext';
import uuid from 'react-uuid';
import { formatISO } from 'date-fns';
import Alert from '@mui/material/Alert';

const AddTask = () => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [taskDescr, setTaskDescr] = useState(null);
  const [taskDuedate, setTaskDuedate] = useState(null);
  const [error, setError] = useState(false);

  const { addTask } = useContext(TasksContext);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setTaskName(null);
    taskDescr(null);
    taskDuedate(null);
  }

  const handleSubmit = () => {
    if (!taskName) {
      setError(true);
      return false;
    }

    const newTask = { id: uuid(), name: taskName, descr: taskDescr, duedate: taskDuedate, completed: false };
    addTask(newTask);
    handleClose();
  }

  return (
    <>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: 30, right: 30 }} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "100%" } }}>
        <DialogTitle>Ajouter une tâche</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskDescr(e.target.value)}
          />
          <DateField
            margin="dense"
            label="Date d'échéance"
            onChange={(e) => setTaskDuedate(formatISO(new Date(e)))}
            format="DD-MM-YYYY"
          />
          {error && <Alert severity="error">Le nom est obligatoire</Alert>}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTask;
