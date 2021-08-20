import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

interface Props {
  handleSubmit: (
    {
      username,
      email,
      password,
    }: {
      email: string;
      password: string;
      username: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
    }>,
  ) => void;

  handleDemoSubmit: ({ username, email, password }: { email: string; password: string; username: string }) => void;
}

const SignUpForm = ({ handleSubmit, handleDemoSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required').max(40, 'Username is too long'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box mt={3} mb={3}>
            <Typography className={classes.label}>Username</Typography>
            <TextField
              id="username"
              fullWidth
              placeholder="Enter your name"
              margin="normal"
              InputProps={{
                classes: { input: classes.inputs },
              }}
              name="username"
              autoComplete="username"
              className={classes.textField}
              autoFocus
              helperText={touched.username ? errors.username : ''}
              error={touched.username && Boolean(errors.username)}
              value={values.username}
              onChange={handleChange}
            />
          </Box>
          <Box mt={3} mb={3}>
            <Typography className={classes.label}>E-mail</Typography>
            <TextField
              id="email"
              placeholder="Enter e-mail address"
              fullWidth
              margin="normal"
              InputProps={{
                classes: { input: classes.inputs },
              }}
              className={classes.textField}
              name="email"
              autoComplete="email"
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              value={values.email}
              onChange={handleChange}
            />
          </Box>
          <Box mt={3} mb={3}>
            <Typography className={classes.label}>Password</Typography>
            <TextField
              id="password"
              placeholder="Enter password"
              fullWidth
              margin="normal"
              InputProps={{
                classes: { input: classes.inputs },
              }}
              type="password"
              className={classes.textField}
              autoComplete="current-password"
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
            />
          </Box>
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN UP'}
            </Button>
            <Button
              onClick={() =>
                handleDemoSubmit({ email: 'stanley@gmail.com', username: 'stanleythemanly', password: '123456' })
              }
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'DEMO'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
