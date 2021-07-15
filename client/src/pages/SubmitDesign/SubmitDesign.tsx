import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import useStyles from './useStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default function SubmitDesign(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <AuthHeader linkTo="/createcontest" btnText="create contest" />
      <Grid container alignItems="center" justify="center" className={classes.container}>
        <Grid container xs={6} className={classes.paperContainer}>
          <Paper elevation={3} className={classes.uploadBox}>
            <Typography variant="h3" className={classes.header}>
              Submit design
            </Typography>
            <CloudUploadIcon fontSize="large" className={classes.icon} />
            <Typography variant="h5" className={classes.chooseFile}>
              Click to choose a file
            </Typography>
            <Typography className={classes.mutedText}>High resolution images</Typography>
            <Typography className={`${classes.bottomLine} ${classes.mutedText}`}>PNG, JPG, GIF</Typography>
          </Paper>
          <Button className={classes.uploadBtn}>submit</Button>
        </Grid>
      </Grid>
    </>
  );
}
