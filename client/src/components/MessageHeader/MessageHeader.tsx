import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";;
import Badge from '@material-ui/core/Badge';
import useStyles from './useStyles';
import { withStyles } from '@material-ui/core/styles';


const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);


interface Props {
  online: boolean;
  username: string;
  profilePic: string;
}

const MessageHeader = ({ online, username, profilePic }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
			<Box className={classes.content}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt="Profile Image" src={profilePic} />
        </StyledBadge>
				<Typography className={classes.username}>{username}</Typography>
			</Box>
			<MoreHorizIcon classes={{ root: classes.ellipsis }} />
		</Box>
  );
}

export default MessageHeader;