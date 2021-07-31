import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { Winner } from '../../interface/User';

interface Props {
  winner: Winner | null;
}

export default function WinnerListContent({ winner }: Props): JSX.Element {
  const classes = useStyles();

  return winner ? (
    <ListItemText
      className={classes.listItem}
      primary={
        <Typography classes={{ root: classes.text }} className={classes.typography}>
          {winner.title}
        </Typography>
      }
      secondary={<Typography classes={{ root: classes.text }}>{winner.description}</Typography>}
    />
  ) : (
    <div></div>
  );
}
