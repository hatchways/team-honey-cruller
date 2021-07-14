import { useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";
import SenderBubble from '../SenderBubble/SenderBubble';
import OtherUserBubble from '../OtherUserBubble/OtherUserBubble';
import useStyles from './useStyles';
import { Message } from '../../interface/User';

interface Props {
  conversation: Message[],
  userId: ""
}
const Messages = ({ conversation, userId }: Props): JSX.Element => {
  const classes = useStyles();
	const messagesEnd = useRef<HTMLInputElement>(null);

	useEffect(() => {
    if(messagesEnd.current) {
      messagesEnd.current.scrollIntoView();
    }
	});

	return (
		<Box className={classes.root}>
      {/* MAP THROUGH MESSAGES HERE */}
			{conversation.map((message, i) => {
        // LEAVING THIS HERE TO POSSIBLY DISPLAY CREATION TIME TO USER
				// const time = moment(message.createdAt).format("MMM Do h:mm");
				return message.senderId === userId ? (
					<SenderBubble
						key={i}
						text={message.text}
						time="insert time"
            latest={false} 
            image="an image"
            imageAlt="an image alternate"
					/>
				) : (
					<OtherUserBubble
						key={i}
						text={message.text}
            time="insert time"
						otherUsername="other username"
            otherPhoto="photo url"
					/>
				);
			})}
			<div ref={messagesEnd}></div>
		</Box>
	);
};

export default Messages;
