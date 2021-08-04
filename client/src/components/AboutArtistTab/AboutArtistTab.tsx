import Box from '@material-ui/core/Box';
import { PersonalInfo } from '../../interface/PersonalInfo';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

interface Props {
  info: PersonalInfo | undefined | null;
}

const AboutArtistTab = ({ info }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box textAlign="center">
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Typography variant="h4" className={classes.heading}>
              {info?.firstName} {info?.middleInit} {info?.lastName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" className={classes.contentMarginsTop}>
              <EmailIcon />
              {<em className={classes.contentMarginsLeft}>{info?.email}</em>}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.contentMarginsTop}>
              <PhoneIcon />
              {<em className={classes.contentMarginsLeft}>{info?.phone}</em>}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.heading} style={{marginTop: '50px'}}>{info?.about}</Typography>
          </Grid>
        </Grid>
    </Box>
  );
};

export default AboutArtistTab;
