import { FormEvent, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { sendMessage } from '../../helpers/APICalls/conversations';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { createNotification } from '../../helpers/APICalls/notification';

interface Props {
  otherUserId: string;
  otherUsername: string;
}

const MessageInput = ({ otherUserId, otherUsername }: Props): JSX.Element => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loggedInUser && inputRef.current) {
      const message = await sendMessage({ to: otherUserId, message: inputRef.current.value });
      const notificationBody = { to: otherUserId, notification: `${loggedInUser?.username} sent you a message`};
      const notification = await createNotification(notificationBody);
      //send notification to the socket server using emit action of sendnotification
      socket?.emit('sendNotification', notification)
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormControl fullWidth hiddenLabel>
        <Grid container alignContent="center" className={classes.inputContainer}>
          <Grid item xs={10}>
            <Input
              placeholder={`Reply to ${otherUsername}`}
              className={classes.input}
              name="text"
              inputProps={{
                ref: inputRef,
              }}
              disableUnderline={true}
              classes={{ input: classes.placeholder }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" className={classes.sendBtn} size="large">
              Send
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default MessageInput;
