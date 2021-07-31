import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { Contest } from '../../interface/User';

interface Props {
  contest: Contest | null;
}

export default function ContestListContent({ contest }: Props): JSX.Element {
  const classes = useStyles();

  return contest ? (
    <ListItemText
      className={classes.contestInfo}
      primary={
        <>
          <Typography className={classes.typography}>{contest.title}</Typography>
        </>
      }
      secondary={
        <>
          <Typography classes={{ root: classes.description }}>{contest.description}</Typography>
          <Container className={classes.container}>
            <Button component={Link} to={`/contest/${contest._id}`} className={classes.button}>
              {contest.prizeAmount}
            </Button>
          </Container>
        </>
      }
    />
  ) : (
    <div></div>
  );
}
