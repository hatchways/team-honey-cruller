import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';
import { useConvoContext } from '../../context/conversationContext';
import { useAuth } from '../../context/useAuthContext';
import { OtherUser } from '../../interface/Convo';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { convo, recipient } = useConvoContext();
  const { loggedInUser } = useAuth();
  const [otherUser, setOtherUser] = useState<OtherUser>();

  useEffect(() => {
    const other =
      loggedInUser && convo && convo.length && loggedInUser.id === convo[0].senderId
        ? {
            _id: convo[0].recipientId,
            username: convo[0].recipientName,
            profilePic: convo[0].recipientPic,
          }
        : convo && convo.length
        ? {
            _id: convo[0].senderId,
            username: convo[0].senderName,
            profilePic: convo[0].senderPic,
          }
        : recipient;
    setOtherUser(other);
  }, [convo, loggedInUser, recipient]);

  return otherUser && otherUser.username ? (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={otherUser.username} profilePic={otherUser.profilePic} />
      <Box className={classes.chatContainer}>
        <Messages convo={convo} />
        <MessageInput otherUserId={otherUser._id} otherUsername={otherUser.username} />
      </Box>
    </Paper>
  ) : (
    <div></div>
  );
}
