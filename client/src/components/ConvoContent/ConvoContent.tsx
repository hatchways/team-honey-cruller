import { useState } from 'react';
import useStyles from './useStyles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface Props {
  username: string;
  lastMessage: string;
}

const ConvoContent = ({ username, lastMessage }: Props): JSX.Element => {
  const classes = useStyles();
  const [unread, setUnread] = useState<number>(0);

  return (
    <Box className={classes.root} onClick={() => setUnread(0)}>
      <Box>
        <Typography className={classes.username}>{username}</Typography>
        <Typography className={classes.lastMessage}>{lastMessage}</Typography>
      </Box>
      {unread ? <Chip color="primary" label={unread} className={classes.chip} /> : null}
    </Box>
  );
};

export default ConvoContent;
