import { useState } from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import { useParams, Link } from 'react-router-dom';
import { resetPassword } from '../../helpers/APICalls/forgotPassword';
import useStyles from './useStyles';

export default function Reset(): JSX.Element {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const classes = useStyles();
  const { token, id } = useParams<{ id: string, token: string }>();

  const handleSubmit = (
    { password } : { password: string }
  ) => {
    resetPassword(password, token, id)
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
          Reset Password
        </Typography>
      </Box>
      <Box mt={3} mb={3} boxShadow={4} component={Paper} className={classes.form}>
        {hasSubmitted && !error ?
        <Box>
          <Typography align="center">
            Your password has be updated!
          </Typography>
          <Box mt={2} mb={2} className={classes.linkContainer}>
            <Link to="/login" className={classes.link}>Login</Link>
            <Link to="/dashboard" className={classes.link}>Home</Link>
          </Box>
        </Box> : error ? <Typography align="center">{error}</Typography> :
        <ResetPasswordForm handleSubmit={handleSubmit}/>}
      </Box>
    </Box>
  );
};
