import { useState } from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import forgotPassword from '../../helpers/APICalls/forgotPassword';
import useStyles from './useStyles';

export default function Reset(): JSX.Element {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const classes = useStyles();

  const handleSubmit = (
    { email } : { email: string }
  ) => {
    forgotPassword(email)
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        }
      });
    setHasSubmitted(prev => !prev);
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Typography align="center" component="h1" variant="h5">
          Forgot Password
        </Typography>
      </Box>
      <Box mt={3} mb={3} boxShadow={4} component={Paper} className={classes.form}>
        {hasSubmitted && !error ?
          <Box>
            <Typography align="center">
              A reset link has been sent to your email
            </Typography>
          </Box> : error ? <Typography align="center">{error}</Typography> :
          <ForgotPasswordForm handleSubmit={handleSubmit}/>}
      </Box>
    </Box>
  );
};
