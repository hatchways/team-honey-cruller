import { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';
import { useConvoContext } from '../../context/conversationContext';
import { useAuth } from '../../context/useAuthContext';
import { sendMessage } from '../../helpers/APICalls/conversations';
import { io } from 'socket.io-client';
import { OtherUser } from '../../interface/Convo';

const socket = io("http://localhost:3000");

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { convo, recipient } = useConvoContext();
  const { loggedInUser } = useAuth();
  const [otherUser, setOtherUser] = useState<OtherUser>();
  const [newMessage, setNewMessage] = useState();
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
    socket.emit("add-user", loggedInUser && loggedInUser.id);
  }, [loggedInUser]);

  const displayMessage = (message: string) => {
    if (loggedInUser && otherUser) {
      const con = createMessage(loggedInUser.id, otherUser._id, message);
      if (con && convo) convo.push(con);
      socket.emit("send-message", loggedInUser.id, otherUser._id, message);
      // sendMessage({ to: otherUser._id, message: message });
    }
  };

  const createMessage = (sender: string, receiver: string, message: string) => {
    if (convo && convo[0]) {
      const newMessage = {
        _id: messageCount.toString(),
        senderId: sender,
        senderName: convo[0].senderName,
        senderPic: convo[0].senderPic,
        recipientId: receiver,
        recipientName: convo[0].recipientName,
        recipientPic: convo[0].recipientPic,
        text: message,
        createdAt: new Date().toString(),
      };
      setMessageCount(prev => prev + 1);
      return newMessage;
    }
  };

  return otherUser && otherUser.username ? (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={otherUser.username} profilePic={otherUser.profilePic} />
      <Box className={classes.chatContainer}>
        <Messages convo={convo} />
        <MessageInput otherUserId={otherUser._id} otherUsername={otherUser.username}
          displayMessage={displayMessage}/>
      </Box>
    </Paper>
  ) : (
    <div></div>
  );
}
