import { useState, SyntheticEvent, ChangeEvent } from 'react';
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Icon from "@material-ui/core/Icon";
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
		<FormControl className={classes.root} onSubmit={handleSubmit} fullWidth hiddenLabel>
					<FilledInput
						classes={{ root: classes.input }}
						disableUnderline
						placeholder='Type something...'
						value={message.text}
						name='text'
						onChange={handleChange}
						endAdornment={
							<InputAdornment position='end'>
								<Icon className={classes.icon}>
									<EmojiEmotionsOutlinedIcon />
								</Icon>
								<Icon className={classes.icon}>
									<FileCopyIcon />
								</Icon>
							</InputAdornment>
						}></FilledInput>
				</FormControl>
	);
}

export default MessageInput;
