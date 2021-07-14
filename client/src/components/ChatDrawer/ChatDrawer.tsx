import { useState, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ChatSideBanner from '../ChatSideBanner/ChatSideBanner';

const  ChatDrawer = (): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div>
      <Fragment>
        <Button onClick={(): void => setExpanded(!expanded)} color="primary" size="large" variant="contained">All Conversations</Button>
        <Drawer anchor={"left"} open={expanded} onClose={(): void => setExpanded(!expanded)}>
          <ChatSideBanner />
        </Drawer>
      </Fragment>
    </div>
  );
}

export default ChatDrawer;