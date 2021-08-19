import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import loginGoogle from '../../../helpers/APICalls/google';
import { Link } from 'react-router-dom';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
  handleDemoSubmit: ({ email, password }: { email: string; password: string }) => void;
}

export default function Login({ handleSubmit, handleDemoSubmit }: Props): JSX.Element {
  const classes = useStyles();

  const responseSuccessGoogle = (response: any) => {
    loginGoogle(response.tokenObj.id_token);
    location.reload();
  };

  const responseErrorGoogle = (response: any) => {
    if (!response) {
      throw new Error('Could not connect to server, please try again');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
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
            <Typography className={classes.label}>E-mail</Typography>
            <TextField
              id="email"
              placeholder="Enter e-mail address"
              fullWidth
              margin="normal"
              className={classes.textField}
              InputProps={{
                classes: { input: classes.inputs },
              }}
              name="email"
              autoComplete="email"
              autoFocus
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
              className={classes.textField}
              InputProps={{
                classes: { input: classes.inputs },
              }}
              type="password"
              autoComplete="current-password"
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Link className={classes.reset} to="/forgot-password">
              Forgot Password?
            </Link>
          </Box>
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN IN'}
            </Button>
            <Button
              onClick={() => handleDemoSubmit({ email: 'stanley@gmail.com', password: '123456' })}
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'DEMO'}
            </Button>
            <GoogleLogin
              clientId="957246139636-2mjg8o2ggfn63l16t9n95u3qi840shk9.apps.googleusercontent.com"
              buttonText="Sign In With Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
}
