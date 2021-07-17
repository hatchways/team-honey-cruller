import Box from '@material-ui/core/Box';
import SenderBubble from '../SenderBubble/SenderBubble';
import OtherUserBubble from '../OtherUserBubble/OtherUserBubble';
import useStyles from './useStyles';
import { Message } from '../../interface/User';
import { useAuth } from '../../context/useAuthContext';
import moment from 'moment';

interface Props {
  convo: Message[] | undefined;
}

const Messages = ({ convo }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <Box className={classes.root}>
      {convo &&
        convo.map((item: Message) => {
          const time = moment(item.createdAt).format('MMM Do h:mm');
          return loggedInUser && item.senderId === loggedInUser.id ? (
            <SenderBubble
              key={item._id}
              text={item.text}
              time={time}
              latest={false}
              image={item.senderPic}
              imageAlt={item.senderName}
            />
          ) : (
            <OtherUserBubble
              key={item._id}
              text={item.text}
              time={time}
              otherUsername={item.recipientName}
              otherPhoto={item.recipientPic}
            />
          );
        })}
    </Box>
  );
};

export default Messages;
