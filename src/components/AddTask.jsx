import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { DateField } from '@mui/x-date-pickers/DateField';
import Fab from '@mui/material/Fab';

const AddTask = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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

export default AddTask;
