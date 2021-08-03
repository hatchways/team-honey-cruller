import { Box, Typography, Paper } from '@material-ui/core';
import ResetForm from './ResetForm/RestForm';
import useStyles from './useStyles';

export default function Reset(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    { email } : { email: string }
  ) => {
    // Send password to email?
    console.log(email);
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Typography align="center" component="h1" variant="h5">
          Reset Password
        </Typography>
      </Box>
      <Box mt={3} mb={3} boxShadow={4} component={Paper} className={classes.form}>
        <ResetForm handleSubmit={handleSubmit}/>
      </Box>
    </Box>
  );
};
