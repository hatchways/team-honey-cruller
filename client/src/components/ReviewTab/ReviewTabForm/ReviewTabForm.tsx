import { Box, Typography, Grid, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Review } from '../../../interface/User';
import useStyles from './useStyles';
import Rating from '@material-ui/lab/Rating';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  handleSubmit: ({ rating, text }: Review) => void;
  artistId: string;
}

export default function ReviewTabForm({ handleSubmit, artistId }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  const INITIAL_VALUES = {
    rating: 5,
    text: '',
    error: '',
    reviewerId: { profilePic: '', username: '' },
    _id: '',
  };

  const VALIDATION_SCHEMA = Yup.object().shape({
    rating: Yup.number(),
    text: Yup.string(),
  });

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box mt={3} mb={3} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Words</Typography>
                <TextField
                  id="text"
                  name="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="This artist is awesome"
                  helperText={touched.text ? errors.text : ''}
                  error={touched.text && Boolean(errors.text)}
                  value={values.text}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Rating</Typography>
                <Rating
                  id="rating"
                  name="rating"
                  value={values.rating}
                  size="large"
                  className={classes.stars}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" marginTop="20px">
              {loggedInUser?.id === artistId ? (
                <Button className={classes.submit} type="submit" variant="contained" color="primary" disabled>
                  Save
                </Button>
              ) : (
                <Button className={classes.submit} type="submit" variant="contained" color="primary">
                  Save
                </Button>
              )}
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
}
