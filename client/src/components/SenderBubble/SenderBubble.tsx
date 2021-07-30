import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

interface Props {
  time: string;
  text: string;
  latest: boolean;
  image: string;
  imageAlt: string;
}

const SenderBubble = ({ time, text }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box width="50%" maxWidth="45%" display="flex" justifyContent="flex-end">
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SenderBubble;
