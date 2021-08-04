import { Box, Typography, Grid } from '@material-ui/core';
import ReviewTabForm from './ReviewTabForm/ReviewTabForm';
import { Review } from '../../interface/User';
import useStyles from './useStyles';
import ArtistCarousel from '../ArtistCarousel/ArtistCarousel';
import Switch from '@material-ui/core/Switch';
import { ChangeEvent, useState } from 'react';

export default function PersonalInfo(): JSX.Element {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = ({ rating, text }: Review) => {
    console.log('rating is', rating);
    console.log('text is', text);
  };

  return (
    <Box textAlign="center">
      <Typography className={classes.activity} variant="h5">
        Recent Reviews
      </Typography>
      <ArtistCarousel />
      <Typography align="center" component="h1" variant="subtitle1">Read all</Typography>
      <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      <Grid container direction="column" style={{ marginTop: '120px' }}>
        <Box mt={1} mb={1}>
          <Typography align="center" component="h1" variant="subtitle1">
            Your review
          </Typography>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <ReviewTabForm handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
