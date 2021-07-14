import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageInput from '../MessageInput/MessageInput';
import Messages from '../Messages/Messages';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  return (
    <Paper className={classes.root}>
      <MessageHeader online={false} username="other user" />
      <Box className={classes.chatContainer}>
        <Messages
          conversation={[{
            senderId: "",
            senderName: "",
            senderPic: "",
            recipientId: "",
            recipientName: "",
            recipientPic: "",
            text: "",
            createdAt: "",
          }]}
          userId=""
        />
        <MessageInput />
      </Box>
    </Paper>
  );
}
