import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import useStyles from './useStyles';


export default function SubmitDesign(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <AuthHeader linkTo="/createcontest" btnText="create contest" />
      <Grid container className={classes.container} alignItems="center" direction="column" justify="center">
        <Paper className={classes.paper}></Paper>
      </Grid>
    </>
  );
}
