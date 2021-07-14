import { useState, SyntheticEvent, ChangeEvent } from 'react';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useStyles from './useStyles';
import { Message } from '../../interface/User';

const MessageInput = (): JSX.Element => {
  const [message, setMessage] = useState<Message>({
  senderId: "",
  senderName: "",
  senderPic: "",
  recipientId: "",
  recipientName: "",
  recipientPic: "",
  text: "",
  createdAt: "",
})
 const classes = useStyles();

 const handleSubmit = (e: SyntheticEvent<HTMLInputElement>) => {
   //post new message
 }

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   //handle input change
 }

	return (
      <FormControl onSubmit={handleSubmit} fullWidth hiddenLabel>
        <Grid container alignContent="center" className={classes.inputContainer}>
          <Grid item xs={10}>
            <Input
              placeholder='Type something...'
              value={message.text}
              className={classes.input}
              name='text'
              disableUnderline={true}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button className={classes.sendBtn} size="large">Send</Button>
          </Grid>
        </Grid>
      </FormControl>
	);
}

export default MessageInput;
