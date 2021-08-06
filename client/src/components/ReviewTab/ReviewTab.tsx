import { Box, Typography, Grid, Paper } from '@material-ui/core';
import ReviewTabForm from './ReviewTabForm/ReviewTabForm';
import { Review } from '../../interface/User';
import useStyles from './useStyles';
import ReviewCarousel from '../ReviewCarousel/ReviewCarousel';
import Switch from '@material-ui/core/Switch';
import { ChangeEvent, useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { createReviews, getReviews } from '../../helpers/APICalls/review';
import { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';

type Props = {
  artistId: string;
};

export default function ReviewTab({ artistId }: Props): JSX.Element {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = async ({ rating, text }: Review) => {
    const review = {
      artistId,
      rating,
      text,
    };
    const result = await createReviews(review);
    if (result.error) {
      updateSnackBarMessage(result.error);
    } else {
      updateSnackBarMessage('Review submitted successfully');
      const updatedRev = reviews ? [...reviews, result] : [result];
      setReviews(updatedRev);
    }
  };

  useEffect(() => {
    async function getReviewsForArtist() {
      const reviews = await getReviews(artistId);
      if (reviews !== null) {
        setReviews(reviews);
      } else {
        new Error('Could Not Get Artist Info');
      }
    }
    getReviewsForArtist();
  }, [artistId]);

  return (
    <Box textAlign="center" pb={5}>
      <Typography className={classes.activity} variant="h5">
        Recent Reviews
      </Typography>
      <ReviewCarousel reviews={reviews} />
      <Paper className={classes.formPaper}>
        <Box mt={1} mb={1} pt={5}>
          <Typography align="center" component="h1" variant="h5">
            Submit your review
          </Typography>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <ReviewTabForm handleSubmit={handleSubmit} artistId={artistId}/>
          </Grid>
        </Grid>
      </Paper>
      <Typography align="center" variant="subtitle1" className={classes.readAll}>
        Read all
      </Typography>
      <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      {checked === true ? (
        reviews.length ? (
          reviews.map((review) => (
            <Box key={review._id} display="flex" justifyContent="center">
              <Paper className={classes.paper}>
                <Box display="flex" mb={2} textAlign="center" pt={2}>
                  <Avatar alt="Profile Image" src={review.reviewerId.profilePic} className={classes.avatar}></Avatar>
                  <Typography className={classes.username}>@{review.reviewerId.username}</Typography>
                </Box>
                <Box display="flex" mb={2} textAlign="center">
                  <Rating value={review.rating} size="large" name="read-only" readOnly />
                </Box>
                <Box display="flex" mb={2}>
                  <Typography className={classes.username}>{review.text}</Typography>
                </Box>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography style={{ marginTop: '30px', padding: '20px' }} variant="h4">
            This artist does not have any review
          </Typography>
        )
      ) : (
        ''
      )}
    </Box>
  );
}
