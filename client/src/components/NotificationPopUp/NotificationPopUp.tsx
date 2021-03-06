import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { updateNotification } from '../../helpers/APICalls/notification';

import { NotificationContext } from '../../context/notificationContext';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiPopover-paper': {
      paddingBottom: 40,
    },
    '*::-webkit-scrollbar': {
      width: '0px',
    },
    '.badge.MuiSvgIcon-root': {
      background:'black'
    },
    '.MuiBadge-badge.MuiBadge-anchorOriginTopRightRectangle.MuiBadge-colorSecondary ':{
      fontWeight:'bold',
      fontSize: '13px',
      backgroundColor: '#fff',
    }
  },
})(() => null);

const NotificationPopUp = (): JSX.Element => {
  const notifications = useContext(NotificationContext).notifications;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterNotification = notifications?.length
    ? notifications?.filter((notification) => notification.opened === false)
    : [];

  const handleNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
    /**
     *  changing the opened property to true by sending post request
     *  so that once the notifications navitem is clicked, those notifications would not be counted as new
     */
    filterNotification.length &&
      filterNotification?.map(async (notification) => await updateNotification(notification));
    setAnchorEl(event.currentTarget);
  };

  const hoursCalculator = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(createdDate.valueOf() - new Date().valueOf());

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffSeconds = Math.ceil(diffTime / 1000);

    return diffSeconds <= 1 && diffMinutes <= 1 && diffHours <= 1 && diffDays <= 1
      ? `1 second ago`
      : diffSeconds > 1 && diffMinutes <= 1 && diffHours <= 1 && diffDays <= 1
      ? `${diffSeconds} seconds ago`
      : diffSeconds >= 60 && diffMinutes <= 2 && diffHours <= 1 && diffDays <= 1
      ? `1 minute ago`
      : diffMinutes > 1 && diffHours <= 1 && diffDays <= 1
      ? `${diffMinutes} minutes ago`
      : diffHours <= 2 && diffDays <= 1 && diffMinutes >= 60
      ? `1 hour ago`
      : diffHours > 1 && diffDays <= 1
      ? `${diffHours} hours ago`
      : diffHours >= 24 && diffDays <= 2
      ? `1 day ago`
      : `${diffDays} days ago`;
  };

  return (
    <>
      <GlobalCss />
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleNotification}>
      <Typography className={classes.authHeaderText} color="secondary">
            Notifications
          </Typography>
        <Badge badgeContent={notifications?.length && filterNotification.length} className={classes.badge} color='secondary'>
          <NotificationsNoneIcon style={{ color:'#fff'}}/>
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
        className={classes.popUpBox}
      >
        <Grid direction="row" container>
          <Grid item>
            <Typography variant="h5" className={classes.poptitle}>
              Notifications
            </Typography>
          </Grid>
          <Grid item>
            <Link to={{ pathname: '/notifications' }} style={{ textDecoration: 'none' }}>
              <Button className={classes.seeAll}>See All</Button>
            </Link>
          </Grid>
        </Grid>
        {notifications?.length ? (
          notifications?.map((notification) => (
            <Link
              to={notification.contestId ? `/contest/${notification.contestId}` : `/dashboard`}
              key={notification._id}
              className={classes.link}
            >
              <Grid direction="row" container className={classes.notificationContainer}>
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
            </Link>
          ))
        ) : (
          <Typography align="center">{`You do not have any notification`}</Typography>
        )}
      </Popover>
    </>
  );
};

export default NotificationPopUp;
