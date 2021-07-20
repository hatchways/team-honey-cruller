import CreateContestForm from './CreateContestForm/CreateContestForm';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Moment } from 'moment';
import axios from 'axios';
import useStyles from './useStyles';

export default function CreateContest():JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    {
      title,
      description,
      prizeAmount,
      deadlineDate,
      images
    }: {
      title: string;
      description: string;
      prizeAmount: number;
      deadlineDate: Moment;
      images: Array<string>;
    }
  ) => {
    const contest = {
      title: title,
      description: description,
      prizeAmount: prizeAmount,
      deadlineDate: deadlineDate.format('MMMM Do YYYY, h:mm A z'),
      images: images,
    };

    axios.post('/contest', contest)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Box mt={4} mb={4}>
        <Typography align="center" component="h1" variant="h5" className={classes.header}>
          Create New Contest
        </Typography>
      </Box>
      <Grid container justify="center">
        <Grid item xs={12} md={10} elevation={6} component={Paper}>
            <CreateContestForm handleSubmit={handleSubmit}/>
        </Grid>
      </Grid>
    </Grid>
  );
};
