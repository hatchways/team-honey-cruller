import { ChangeEvent, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import Search from '../Search/Search';
import ConvoCard from '../ConvoCard/ConvoCard';

interface Props {
  handleDrawerToggle?: () => void;
}

const ChatSideBanner = (): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Grid className={classes.chatSideBanner}>
      <Box className={classes.userPanel}>
        <Typography variant="h5" className={classes.heading}>Inbox Messages</Typography>
      </Box>
      <Box>
        <Search search={search} handleChange={handleChange} />
      </Box>
      <ConvoCard />
    </Grid>
  );
};

export default ChatSideBanner;
