import Box from '@material-ui/core/Box';
import { PersonalInfo } from '../../interface/PersonalInfo';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { submissionByArtist } from '../../interface/User';
import ArtistCarousel from '../ArtistCarousel/ArtistCarousel';

interface Props {
  info: PersonalInfo | undefined;
  submission: submissionByArtist[];
}

const AboutArtistTab = ({ info, submission }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box textAlign="center" pb={5}>
      <Typography className={classes.activity} variant="h5">
        Recent Activity
      </Typography>
      <ArtistCarousel submission={submission} />
      {info ? (
        <Box display="flex" flexDirection="column" mt={10} className={classes.root}>
          <Typography variant="h3" className={classes.heading}>
            {info?.firstName} {info?.middleInit} {info?.lastName}
          </Typography>
          <Typography variant="body1" className={classes.contentMarginsTop}>
            <EmailIcon />
            {<em className={classes.contentMarginsLeft}>{info?.email}</em>}
          </Typography>
          <Typography className={classes.contentMarginsTop}>
            <PhoneIcon />
            {<em className={classes.contentMarginsLeft}>{info?.phone}</em>}
          </Typography>
          <Typography className={classes.about} variant="h5">
            {info?.about}
          </Typography>
        </Box>
      ) : (
        <Typography style={{ marginTop: '30px', padding: '20px' }} variant="h5">
          This artist does not have any personal info
        </Typography>
      )}
    </Box>
  );
};

export default AboutArtistTab;
