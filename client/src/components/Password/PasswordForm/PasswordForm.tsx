import { Box, Typography, Button, TextField, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import * as Yup from 'yup';
import { Formik } from 'formik';

interface Props {
  handleSubmit: (
    {
      password, confirmPassword
    } :
    {
      password: string;
      confirmPassword: string;
    }
  ) => void;
}

export default function ChangePasswordForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
    initialValues={{
      password: '',
      confirmPassword: '',
    }}
    validationSchema={Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .max(100, 'Password is too long')
        .min(6, 'Password too short'),
      confirmPassword: Yup.string().when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password does not match!"
        )
      })
    })}
    onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box mt={3}>
            <Typography>Password</Typography>
            <TextField
              id="password"
              name="password"
              type="password"
              margin="normal"
              variant="outlined"
              placeholder="Password"
              className={classes.fields}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
            />
          </Box>
          <Box mt={3} mb={3}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              margin="normal"
              variant="outlined"
              placeholder="Confirm Password"
              className={classes.fields}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              value={values.confirmPassword}
              onChange={handleChange}/>
          </Box>
          <Box mb={3}>
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.fields}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Update Password'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
