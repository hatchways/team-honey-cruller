import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';
import { useConvoContext } from '../../context/conversationContext';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { sendMessage } from '../../helpers/APICalls/conversations';
import { OtherUser } from '../../interface/Convo';
import { User } from '../../interface/User';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { convo, recipient, setConvo } = useConvoContext();
  const { loggedInUser } = useAuth();
  const { socket, message } = useSocket();
  const [otherUser, setOtherUser] = useState<OtherUser>();
  const [messageCount, setMessageCount] = useState(0);

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

  useEffect(() => {
    if (message) {
      const updatedMessage = convo && convo.length ? [...convo, message] : [message];
      setConvo(updatedMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageCount]);

  const displayMessage = (message: string) => {
    if (loggedInUser && otherUser) {
      const con = createMessage(loggedInUser, otherUser, message);
      const updatedMessage = convo?.length ? [...convo, con] : [con];
      setConvo(updatedMessage);
      socket?.emit(
        'send-message',
        loggedInUser.id,
        loggedInUser.profilePic,
        otherUser._id,
        otherUser.profilePic,
        message,
      );
      sendMessage({ to: otherUser._id, message: message });
    }
  };

  const createMessage = (user: User, receiver: OtherUser, message: string) => {
      const newMessage = {
        _id: messageCount.toString(),
        conversationId: messageCount.toString(),
        senderId: user.id,
        senderName: user.username,
        senderPic: user.profilePic,
        recipientId: receiver._id,
        recipientName: receiver.username,
        recipientPic: receiver.profilePic,
        text: message,
        createdAt: new Date().toString(),
      };
      setMessageCount((prev) => prev + 1);
      return newMessage;
  };

  return otherUser && otherUser.username ? (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={otherUser.username} profilePic={otherUser.profilePic} />
      <Box className={classes.chatContainer}>
        <Messages convo={convo} />
        <MessageInput otherUserId={otherUser._id} otherUsername={otherUser.username} displayMessage={displayMessage} />
      </Box>
    </Paper>
  ) : (
    <div></div>
  );
}
