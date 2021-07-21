import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';
import { useConvoContext } from '../../context/conversationContext';
import { useAuth } from '../../context/useAuthContext';

interface OtherUser {
  id: string;
  name: string;
  pic: string;
}

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { convo } = useConvoContext();
  const { loggedInUser } = useAuth();
  const [otherUser, setOtherUser] = useState<OtherUser>();

  useEffect(() => {
    const other =
      loggedInUser && convo && loggedInUser.id === convo[0].senderId
        ? {
            id: convo[0].recipientId,
            name: convo[0].recipientName,
            pic: convo[0].recipientPic,
          }
        : convo && {
            id: convo[0].senderId,
            name: convo[0].senderName,
            pic: convo[0].senderPic,
          };
    setOtherUser(other);
  }, [convo, loggedInUser]);

  return otherUser ? (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={otherUser.name} profilePic={otherUser.pic} />
      <Box className={classes.chatContainer}>
        <Messages convo={convo} />
        <MessageInput otherUserId={otherUser.id} />
      </Box>
    </Paper>
  ) : (
    <div></div>
  );
}
