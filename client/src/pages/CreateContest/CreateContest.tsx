import CreateContestForm from './CreateContestForm/CreateContestForm';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Contest } from '../../interface/Contest';
import { addContest } from '../../helpers/APICalls/contest';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useHistory } from "react-router-dom";
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

export default function CreateContest():JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    {
      title,
      description,
      prizeAmount,
      deadlineDate,
      images
    }: Contest
  ) => {
    const contest = { title, description, prizeAmount, deadlineDate, images };

    addContest(contest)
      .then((res) => {
        if (res.error) {
          updateSnackBarMessage(res.error.message);
        } else {
          updateSnackBarMessage('Sucessfully created contest');
          history.push('/discovery');
        }
      });
  };

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Grid container direction="column" spacing={0}>
        <Box mt={4} mb={4}>
          <Typography align="center" component="h1" variant="h5" className={classes.header}>
            Create New Contest
          </Typography>
        </Box>
        <Grid container justify="center">
          <Grid item xs={12} md={10} elevation={6} component={Paper} className={classes.paper}>
              <CreateContestForm handleSubmit={handleSubmit}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
