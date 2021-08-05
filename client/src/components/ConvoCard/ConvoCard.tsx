import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import ConvoContent from '../ConvoContent/ConvoContent';
import { useAuth } from '../../context/useAuthContext';
import { useConvoContext } from '../../context/conversationContext';
import { Convo } from '../../interface/User';

interface Props {
  convo: Convo;
  closeDrawer?: (arg0: boolean) => void;
}

const ConvoCard = ({ convo, closeDrawer }: Props): JSX.Element => {
  const [online, setOnline] = useState<boolean>(false);
  const classes = useStyles();
  const { setFriendId } = useConvoContext();
  const { loggedInUser } = useAuth();
  const [otherUser] = convo.recipients.filter((person) => loggedInUser && person._id !== loggedInUser.id);
  const lastMessageDate = new Date(convo.updatedAt);

  return otherUser ? (
    <Box
      className={classes.root}
      onClick={() => {
        setFriendId(otherUser._id);
        closeDrawer && closeDrawer(false);
      }}
    >
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        overlap="circle"
      >
        <Avatar alt={otherUser.username} src={otherUser.profilePic} className={classes.profilePic}></Avatar>
      </Badge>
      <ConvoContent username={otherUser.username} lastMessage={convo.lastMessage} />
      <Box>
        <Typography className={classes.date}>{lastMessageDate.toString().slice(0, 10)}</Typography>
      </Box>
    </Box>
  ) : (
    <div></div>
  );
};

export default ConvoCard;
