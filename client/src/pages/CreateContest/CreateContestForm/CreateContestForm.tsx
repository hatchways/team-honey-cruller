import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function CreateContestForm():JSX.Element {
  return (
    <Box>
      <form>
        <Box>
          <Typography>What do you need designed?</Typography>
          <TextField></TextField>
        </Box>
        <Box>
          <Typography>Description</Typography>
          <TextField></TextField>
        </Box>
        <Box>
          <Box>
            <Typography>Prize amount</Typography>
            <TextField></TextField>
          </Box>
          <Box>
            <Typography>Deadline</Typography>
            <TextField></TextField>
          </Box>
        </Box>
        <Box>
          <Typography>Which designs do you like?</Typography>
          <Box>

          </Box>
        </Box>
        <Box>
          <Button>

          </Button>
        </Box>
      </form>
    </Box>
  );
};
