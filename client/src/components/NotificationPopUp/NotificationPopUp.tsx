import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Notification } from '../../interface/User';
import { updateNotification } from '../../helpers/APICalls/notification';
import useStyles from './useStyles';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  notifications: Notification[];
}

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiPopover-paper': {
      paddingBottom: 40,
    },
  },
})(() => null);

const NotificationPopUp = ({ notifications }: Props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setOpen(true);
    /**
     *  changing the opened property to true by sending post request
     *  so that once the notifications navitem is clicked, those notifications would not be counted as new
     */
    notifications?.map(async (notification) => await updateNotification(notification));
    setAnchorEl(event.currentTarget);
  };

  const hoursCalculator = (createdAt: string): string => {
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();

    const createdHour = new Date(createdAt).getHours();
    const createdMinutes = new Date(createdAt).getMinutes();

    return currentHour - createdHour < 1
      ? `${currentMinutes - createdMinutes} minutes ago`
      : currentHour - createdHour === 1
      ? `1 hour ago`
      : `${currentHour - createdHour} hours ago`;
  };

  return (
    <div>
      <GlobalCss />
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleNotification}>
        <Badge badgeContent={notifications?.filter((notification) => notification.opened === false).length}>
          Notifications
          <NotificationsNoneIcon />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Grid direction="row" container>
          <Grid item>
            <Typography variant="h5" className={classes.poptitle}>
              Notifications
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/notification" style={{ textDecoration: 'none' }}>
              <Button className={classes.seeAll}>See All</Button>
            </Link>
          </Grid>
        </Grid>
        {notifications.map((notification) => (
          <>
            <Grid direction="row" container>
              <Grid item>
                <Avatar alt="Profile Image" src={notification.profilePic} className={classes.avatar}></Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.typography} key={notification._id}>
                  {notification.notification}
                </Typography>
                <Typography key={notification.notification} className={classes.time}>
                  {hoursCalculator(notification.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </>
        ))}
      </Popover>
    </div>
  );
};

export default NotificationPopUp;
