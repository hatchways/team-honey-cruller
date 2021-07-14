import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from './useStyles';

interface Props {
  time: string, 
  text: string, 
  latest: boolean, 
  image: string, 
  imageAlt: string,
}

const SenderBubble = ({time, text} : Props): JSX.Element => {
 const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Typography className={classes.date}>{time}</Typography>
			<Box className={classes.bubble}>
				<Typography className={classes.text}>{text}</Typography>
			</Box>
      {/* USED FOR LAST READ MESSAGE */}
			{/* {latest && (
				<Avatar alt={imageAlt} src={image} className={classes.avatar}></Avatar>
			)} */}
		</Box>
	);
}

export default SenderBubble;
