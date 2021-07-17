import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';
import { useConvoContext } from '../../context/conversationContext';
import { useAuth } from '../../context/useAuthContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { convo } = useConvoContext();
  const { loggedInUser } = useAuth();
  const otherUser = loggedInUser && convo && loggedInUser.id === convo[0].senderId ? 'senderName' : 'recipientName';

  return (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={convo ? convo[0][otherUser] : ''} profilePic="" />
      <Box className={classes.chatContainer}>
        <Messages convo={convo} />
        <MessageInput />
      </Box>
    </Paper>
  );
}
