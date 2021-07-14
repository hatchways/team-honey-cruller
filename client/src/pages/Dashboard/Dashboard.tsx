import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import ActiveChat from '../../components/ActiveChat/ActiveChat';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <>
    {/* CURRENTLY NO ROUTE FOR "/CREATECONTEST" THIS MAY NEED TO CHANGE */}
    <AuthHeader btnText="create contest" linkTo="/createcontest" />
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={4} className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Paper elevation={6}>
          <ActiveChat />
        </Paper>
      </Grid>
    </Grid>
    </>
  );
}
