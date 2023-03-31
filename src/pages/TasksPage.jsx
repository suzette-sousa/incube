import { TasksProvider } from '../context/TasksContext';
import Tasks from "./../components/Tasks";
// --- @mui --- //
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AssignmentIcon from '@mui/icons-material/Assignment';
// --- @mui - end --- //

const TasksPage = () => {
  return (
    <Container maxWidth="xl">
      <header>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          sx={{ mt: 3, fontWeight: "100" }}
        >
          Ma liste de tâches
        </Typography>
      </header>

      <Divider>
        <Chip
          icon={<AssignmentIcon />}
          label="Tâches"
          sx={{ 
            "& .MuiChip-label": { display: "none" }, 
            "& .MuiChip-icon": { margin: 0, color: "#000" }, 
            width: "3rem", 
            height: "3rem", 
            my: 2 
          }}
          variant="outlined"
        />
      </Divider>

      <main>
        <TasksProvider>
          <Tasks />
        </TasksProvider>
      </main>
    </Container>
  )
}

export default TasksPage;
