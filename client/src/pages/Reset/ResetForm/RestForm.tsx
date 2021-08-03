import { Box, Typography, Button, TextField, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import * as Yup from 'yup';
import { Formik } from 'formik';

interface Props {
  handleSubmit: (
    { email } :
    { email: string; }
  ) => void;
}

export default function ResetForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
    initialValues={{
      email: '',
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string().required('Email is required').email('Email is not valid')
    })}
    onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box mt={3}>
            <Typography>Email</Typography>
            <TextField
              id="email"
              name="email"
              margin="normal"
              variant="outlined"
              className={classes.fields}
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              value={values.email}
              onChange={handleChange}
            />
          </Box>
          <Box mb={3}>
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.fields}>
            {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Confirmation'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
