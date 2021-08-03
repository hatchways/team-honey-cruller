import { useContext } from 'react';
import { deleteNotification } from '../../helpers/APICalls/notification';
import useStyles from './useStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { NotificationContext } from '../../context/notificationContext';
import { Link } from 'react-router-dom';

interface NotificationProps {
  header: boolean;
}

export default function Notifications({ header }: NotificationProps): JSX.Element {
  header === undefined ? (header = true) : header;
  const notifications = useContext(NotificationContext).notifications;
  const setNotifications = useContext(NotificationContext).setNotifications;
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const response = await deleteNotification(target.value);
    if (response === 204) {
      const filteredNotifications = notifications && notifications.filter((item) => item._id !== target.value);
      updateSnackBarMessage('Notification deleted successfully');
      setNotifications(filteredNotifications ? filteredNotifications : notifications);
    } else {
      updateSnackBarMessage('Error deleting notification, trying again later');
    }
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

  return loggedInUser ? (
    <>
      <CssBaseline />
      {header ? <AuthHeader linkTo={`/create-contest`} btnText="CREATE CONTEST" /> : ''}
      <Box display="flex" justifyContent="center">
        <Paper className={classes.paper} elevation={2}>
          <Grid direction="row" container>
            <Grid item>
              <Typography variant="h5" className={classes.poptitle}>
                Notifications
              </Typography>
            </Grid>
          </Grid>
          {notifications?.length
            ? notifications?.map((notification) => (
                <Grid direction="row" container key={notification._id}>
                  <Grid item xs={12} sm={3} md={2}>
                    <Avatar alt="Profile Image" src={notification.profilePic} className={classes.avatar}></Avatar>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Link to={notification.contestId ? `/contest/${notification.contestId}` : `/dashboard`}>
                      <Typography className={classes.typography} key={notification._id}>
                        {notification.notification}
                      </Typography>
                    </Link>
                    <Typography className={classes.typography} key={notification._id}>
                      {notification.notification}
                    </Typography>
                    <Typography key={notification.notification} className={classes.time}>
                      {hoursCalculator(notification.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={1} md={1}>
                    <button className={classes.delete} onClick={handleDelete} value={notification._id}>
                      Delete
                    </button>
                  </Grid>
                </Grid>
              ))
            : <Typography align="center">{`You do not have any notification`}</Typography>}
        </Paper>
      </Box>
    </>
  ) : (
    <CircularProgress />
  );
}
