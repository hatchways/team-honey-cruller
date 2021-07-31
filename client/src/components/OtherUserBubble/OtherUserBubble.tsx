import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';

interface Props {
  time: string;
  text: string;
  otherUsername: string;
  otherPhoto: string;
}

const OtherUserBubble = ({ time, text, otherUsername, otherPhoto }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" flex-direction="column" alignItems="flex-end" maxWidth="90%">
      <Avatar alt={otherUsername} src={otherPhoto} className={classes.avatar}></Avatar>
      <Box maxWidth="50%">
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
