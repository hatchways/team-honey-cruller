import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ActiveChat from '../../components/ActiveChat/ActiveChat';
import ChatDrawer from '../../components/ChatDrawer/ChatDrawer';
import { getAllConvos } from '../../helpers/APICalls/conversations';
import { ConversationProvider } from '../../context/conversationContext';
import { Convo } from '../../interface/User';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();
  const [convos, setConvos] = useState<Convo[]>([]);

  useEffect(() => {
    getAllConvos().then((data: Convo[]) => {
      if (data) {
        setConvos(data);
      }
    });
  }, []);

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
    <ConversationProvider>
      <AuthHeader btnText="create contest" linkTo="/create-contest" />
      <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={4} className={classes.drawerWrapper}>
          <Hidden xsDown={true}>
            <ChatSideBanner convos={convos} />
          </Hidden>
          <Hidden smUp={true}>
            <ChatDrawer convos={convos} />
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={6} md={8} className={classes.chatWrapper}>
          <Paper elevation={3}>
            <ActiveChat />
          </Paper>
        </Grid>
      </Grid>
    </ConversationProvider>
  );
}
