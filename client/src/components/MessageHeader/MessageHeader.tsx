import { Box, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";;
import useStyles from './useStyles';

interface Props {
  online: boolean;
  username: string;
}

const MessageHeader = ({ online, username }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
			<Box className={classes.content}>
				<Typography className={classes.username}>{username}</Typography>
				<Box
					className={`${classes.statusDot} ${classes[online ? "online" : "offline"]}`}
				></Box>
				<Typography className={classes.statusText}>
					{online ? "Online" : "Offline"}
				</Typography>
			</Box>
			<MoreHorizIcon classes={{ root: classes.ellipsis }} />
		</Box>
  );
}

export default MessageHeader;