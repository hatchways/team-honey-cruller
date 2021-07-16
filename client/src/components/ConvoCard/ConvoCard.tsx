import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import ConvoContent from '../ConvoContent/ConvoContent';
import { useAuth } from '../../context/useAuthContext';
import { Convo } from '../../interface/User';

interface Props {
  convo: Convo;
}

const ConvoCard = ({ convo }: Props): JSX.Element => {
  const [online, setOnline] = useState<boolean>(false);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [otherUser] = convo.recipients.filter((person) => loggedInUser && person._id !== loggedInUser._id);

  const selectConversation = () => {
    //set conversation state
  };

  return (
    <Box className={classes.root} onClick={selectConversation}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        overlap="circle"
      >
        <Avatar
          alt={otherUser.username}
          src={`https://robohash.org/${otherUser.email}.png`}
          className={classes.profilePic}
        ></Avatar>
      </Badge>
      <ConvoContent username={otherUser.username} lastMessage={convo.lastMessage} />
      <Box>
        {/* PROBABLY WANT TO FORMAT THIS DATE SOMEHOW BEFORE THIS STEP */}
        <Typography className={classes.date}>{convo.date.slice(0, 10)}</Typography>
      </Box>
    </Box>
  );
};

export default ConvoCard;
