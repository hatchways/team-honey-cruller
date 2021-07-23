import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';

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
          </Box>
          <div style={{ height: 95 }} />
        </form>
      )}
    </Formik>
  );
}
