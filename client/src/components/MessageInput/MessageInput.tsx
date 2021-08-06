import { FormEvent, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Grid, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { createNotification } from '../../helpers/APICalls/notification';

interface Props {
  otherUserId: string;
  otherUsername: string;
  displayMessage: (
    msg: string
  ) => void;
};

const MessageInput = ({ otherUserId, otherUsername, displayMessage }: Props): JSX.Element => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loggedInUser && inputRef.current) {
      displayMessage(inputRef.current.value);
      const notificationBody = { to: otherUserId, notification: `${loggedInUser?.username} sent you a message`};
      const notification = await createNotification(notificationBody);
      //send notification to the socket server using emit action of sendnotification
      socket?.emit('sendNotification', notification)
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormControl fullWidth hiddenLabel>
        <Grid container alignContent="center" className={classes.inputContainer}>
          <Grid item xs={12}>
            <TextField
              placeholder={`Reply to ${otherUsername}`}
              className={classes.input}
              name="text"
              margin="normal"
              variant="outlined"
              fullWidth
              inputProps={{
                ref: inputRef,
              }}
            />
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default MessageInput;
