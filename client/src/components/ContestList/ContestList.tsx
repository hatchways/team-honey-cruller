import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { Contest, Winner } from '../../interface/User';
import ContestListContent from '../ContestListContent/ContestListContent';
import WinnerListContent from '../WinnerListContent/WinnerListContent';
import ImageModal from '../../components/ImageModal/ImageModal';
import LionTattoo from '../../Images/lionTattoo.png';

interface Props {
  userContests: Contest[] | Winner[];
}

export default function ContestList({ userContests }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <>
      {/* Write ternary operator checking to see if any data has been recieved, otherwise return default message */}
      {userContests.length > 0 ? (
        <List className={classes.list}>
          {/* map through given data and alter the return inside of the map */}
          {userContests.map((contest: Contest | Winner) => (
            <ListItem key={contest._id}>
              <Grid container alignItems="center" className={classes.contestContainer}>
                <Grid item>
                  <ImageModal
                    image={
                      'winningPic' in contest
                        ? contest.winningPic
                        : 'images' in contest && contest.images[0]
                        ? contest.images[0]
                        : LionTattoo
                    }
                    artistName={'winningArtist' in contest ? contest.winningArtist.username : ''}
                    artistPic={'winningArtist' in contest ? contest.winningArtist.profilePic : ''}
                  >
                    <img
                      className={classes.avatar}
                      alt="Test Contest Image"
                      src={
                        'winningPic' in contest
                          ? contest.winningPic
                          : 'images' in contest && contest.images[0]
                          ? contest.images[0]
                          : LionTattoo
                      }
                    />
                  </ImageModal>
                </Grid>
                <Grid item>
                  {'images' in contest ? (
                    <ContestListContent contest={contest} />
                  ) : (
                    <WinnerListContent winner={contest} />
                  )}
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography classes={{ root: classes.noneAvailable }}> None Available </Typography>
      )}
    </>
  );
}
