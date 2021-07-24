import { Box, Typography, Grid } from '@material-ui/core';
import PersonalInfoForm from './PersonalInfoForm/PersonalInfoForm';
import { PersonalInfoProps } from '../../interface/PersonalInfo';
import { postPersonalInfo } from '../../helpers/APICalls/personalInfo';
import useStyles from './useStyles';

export default function PersonalInfo(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = ({
    firstName,
    middleInit,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    about,
  }: PersonalInfoProps) => {
    const info = {
      firstName, middleInit, lastName, email, phone, dateOfBirth, gender, about,
    };

    postPersonalInfo(info);
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Box mt={2} mb={2}>
        <Typography align="center" component="h1" variant="h5">
          Personal Information
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
            <PersonalInfoForm handleSubmit={handleSubmit}/>
        </Grid>
      </Grid>
    </Grid>
  );
};
