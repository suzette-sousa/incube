import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoneIcon from '@mui/icons-material/Done';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import { parseISO } from 'date-fns';
import { isPast } from 'date-fns';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateField } from '@mui/x-date-pickers/DateField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Task = (props) => {
  const {task} = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isPast(parseISO(task.duedate)) && task.status === 0 && <WarningAmberIcon color="error" />} Date d'échéance : {format(parseISO(task.duedate), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body2">
            Description : {task.descr}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel control={<Switch checked={task.status === 1 ? true : false} color={task.status === 1 ? "success" : "default"} />} label="Terminé" />
          <IconButton color="primary" sx={{ marginLeft: "auto" }} onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
      
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "100%"}}}>
        <DialogTitle>Éditer une tâche</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <DateField
            margin="dense"
            label="Date d'échéance"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </> 
  );
}

export default Task;
