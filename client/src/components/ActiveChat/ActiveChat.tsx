import { useState, useEffect } from 'react';
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
  const [newMessages, setNewMessages] = useState(0);

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

  socket.on("receive-message", (data) => {
    if (convo) {
      const newMessage = {
        _id: newMessages.toString(),
        senderId: data.senderId,
        senderName: convo[0].senderName,
        senderPic: convo[0].senderPic,
        recipientId: data.receiverId,
        recipientName: convo[0].recipientName,
        recipientPic: convo[0].recipientPic,
        text: data.message,
        createdAt: new Date().toString(),
      };
      convo.push(newMessage);
      setNewMessages(prev => prev + 1);
    }
  });

  useEffect(() => {
    socket.emit("add-user", loggedInUser && loggedInUser.id);
  }, [loggedInUser]);


  const displayMessage = (message: string)=> {
    if (loggedInUser && otherUser) {
      socket.emit("send-message", loggedInUser.id, otherUser._id, message);
      sendMessage({ to: otherUser._id, message: message });
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
