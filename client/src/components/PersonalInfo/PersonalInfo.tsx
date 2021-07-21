import { Box, Typography, Grid, Paper } from '@material-ui/core';
import { classicNameResolver } from 'typescript';
import PersonalInfoForm from './PersonalnfoForm/PersonalInfoForm';
import useStyles from './useStyles';

export default function PersonalInfo(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = ({
    firstName,
    middleInit,
    lastName,
    email,
    phone,
    birthday,
    gender,
    about,
  }: {
    firstName: string;
    middleInit: string;
    lastName: string;
    email: string;
    phone: number;
    birthday: Date;
    gender: string;
    about: string;
  }) => {
    const info = {
      firstName: firstName,
      middleInit: middleInit,
      lastName: lastName,
      email: email,
      phone: phone,
      birthday: birthday,
      gender: gender,
      about: about,
    }
    console.log(info);
  }

  return (
    <Grid container direction="column" className={classes.root}>
      <Box mt={2} mb={2}>
        <Typography align="center" component="h1" variant="h5">
          Personal Information
        </Typography>
      </Box>
      <Grid container justify="center">
        <Grid item xs={12} md={10} elevation={6} component={Paper}>
            <PersonalInfoForm handleSubmit={handleSubmit}/>
        </Grid>
      </Grid>
    </Grid>
  )
};
