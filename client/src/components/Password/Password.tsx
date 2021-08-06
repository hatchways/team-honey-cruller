import { useState } from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import PasswordForm from './PasswordForm/PasswordForm';
import { changePassword } from '../../helpers/APICalls/password';
import useStyles from './useStyles';

export default function Password(): JSX.Element {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const classes = useStyles();

  const handleSubmit = (
    { password } : { password: string }
  ) => {
    changePassword(password)
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setError('');
        }
      });
    setHasSubmitted(prev => !prev);
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Typography align="center" component="h1" variant="h5">
          Change Password
        </Typography>
      </Box>
      <Box mt={3} mb={3} boxShadow={4} component={Paper} className={classes.form}>
        {
          hasSubmitted && !error
          ? <Box>
              <Typography align="center">
                Your password has be updated!
              </Typography>
            </Box>
          : error
          ? <Typography align="center">{error}</Typography>
          : <PasswordForm handleSubmit={handleSubmit}/>
        }
      </Box>
    </Box>
  );
};
