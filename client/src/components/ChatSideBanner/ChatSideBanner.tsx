import { ChangeEvent, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import Search from '../Search/Search';
import ConvoCard from '../ConvoCard/ConvoCard';
import { Convo } from '../../interface/User';
import { getAllConvos } from '../../helpers/APICalls/conversations';

const ChatSideBanner = (): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [convos, setConvos] = useState<Convo[]>([]);
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const classes = useStyles();

  useEffect(() => {
    getAllConvos().then((data: Convo[]) => {
      if (data) {
        setConvos(data);
      }
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Grid className={classes.chatSideBanner}>
      <Box className={classes.userPanel}>
        <Typography variant="h5" className={classes.heading}>
          Inbox Messages
        </Typography>
      </Box>
      <Box>
        <Search search={search} handleChange={handleChange} />
      </Box>
      {convos && convos.map((convo) => <ConvoCard key={convo._id} convo={convo} />)}
    </Grid>
  );
};

export default ChatSideBanner;
