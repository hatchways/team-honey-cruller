import CreateContestForm from './CreateContestForm/CreateContestForm';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function CreateContest():JSX.Element {
  return (
    <Box>
      <Typography align="center" component="h1" variant="h5">
        Create New Contest
      </Typography>
      <CreateContestForm />
    </Box>
  );
};
