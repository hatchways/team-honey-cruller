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
          alt={loggedInUser ? loggedInUser.username : 'username'}
          src={`https://robohash.org/${loggedInUser && loggedInUser.email}.png`}
          className={classes.profilePic}
        ></Avatar>
      </Badge>
      <ConvoContent />
      <Box>
        <Typography className={classes.date}>date</Typography>
      </Box>
    </Box>
  );
};

export default ConvoCard;
