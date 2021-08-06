import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ActiveChat from '../../components/ActiveChat/ActiveChat';
import ChatDrawer from '../../components/ChatDrawer/ChatDrawer';
import { getAllConvos } from '../../helpers/APICalls/conversations';
import { ConversationProvider } from '../../context/conversationContext';
import { Convo } from '../../interface/User';
import { useSocket } from '../../context/useSocketContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const history = useHistory();
  const { initSocket } = useSocket();
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
      <Container classes={{ root: classes.root }} maxWidth={false}>
        <AuthHeader btnText="create contest" linkTo="/create-contest" />
        <Grid container component="main" className={classes.container}>
          <CssBaseline />
          <Grid item xs={12} md={6} lg={4} className={classes.drawerWrapper}>
            <Hidden smDown={true}>
              <ChatSideBanner convos={convos} />
            </Hidden>
            <Hidden mdUp={true}>
              <ChatDrawer convos={convos} />
            </Hidden>
          </Grid>
          <Grid item xs={12} md={6} lg={8} className={classes.chatWrapper}>
            <ActiveChat />
          </Grid>
        </Grid>
      </Container>
    </ConversationProvider>
  );
}
