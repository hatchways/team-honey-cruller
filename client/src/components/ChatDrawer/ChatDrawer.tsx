import { useState, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatSideBanner from '../ChatSideBanner/ChatSideBanner';
import useStyles from './useStyles';
import { Convo } from '../../interface/User';

interface Props {
  convos: Convo[];
}

const ChatDrawer = ({ convos }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <div>
      <Fragment>
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            onClick={(): void => setExpanded(!expanded)}
            color="primary"
            size="large"
            variant="contained"
            className={classes.expandBtn}
          >
            All Conversations
          </Button>
        </Box>
        <Drawer anchor={'left'} open={expanded} onClose={(): void => setExpanded(!expanded)}>
          <ChatSideBanner convos={convos} />
        </Drawer>
      </Fragment>
    </div>
  );
};

export default ChatDrawer;
