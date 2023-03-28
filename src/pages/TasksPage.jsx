import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Tasks from "./../components/Tasks";
import { TasksProvider } from '../context/TasksContext';

const TasksPage = () => {
  return (
    <Container maxWidth="xl">
      <header>
        <Typography variant="h4" component="h1" align="center" sx={{ mt: 3 }}>Tâches</Typography>
      </header>
      <Divider>
        <Chip icon={<AssignmentIcon />} sx={{ "& .MuiChip-label": { display: "none" }, "& .MuiChip-icon": { margin: 0 }, width: "3rem", height: "3rem", my: 3 }} variant="outlined" />
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
