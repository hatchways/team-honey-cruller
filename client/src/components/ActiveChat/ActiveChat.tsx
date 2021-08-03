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

const socket = io("http://localhost:3000");

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
  const [newMessages, setNewMessages] = useState(0);

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
  }, [convo, loggedInUser, newMessages]);

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
      socket.emit("send-message", loggedInUser.id, otherUser.id, message);
      sendMessage({ to: otherUser.id, message: message });
    }
  };

  return otherUser ? (
    <Paper className={classes.root}>
      <MessageHeader online={false} username={otherUser.name} profilePic={otherUser.pic} />
      <Box className={classes.chatContainer}>
        <Messages convo={convo}/>
        <MessageInput displayMessage={displayMessage}/>
      </Box>
    </Paper>
  ) : (
    <div></div>
  );
}
