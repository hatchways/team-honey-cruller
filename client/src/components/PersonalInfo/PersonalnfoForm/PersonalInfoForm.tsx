import { Box, Typography, Grid, TextField, Select, MenuItem, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';

interface Props {
  handleSubmit: ({
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
  }) => void;
};

export default function PersonalInfo({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  const INITIAL_VALUES = {
    firstName: '',
    middleInit: '',
    lastName: '',
    email: '',
    phone: 0,
    birthday: new Date(),
    gender: '',
    about: '',
  };

  const VALIDATION_SCHEMA = Yup.object().shape({

  });

  return (
    <Formik
    initialValues={INITIAL_VALUES}
    validationSchema={VALIDATION_SCHEMA}
    onSubmit={values => {
      console.log(values);
    }}>
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box mt={3} mb={3}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography>First Name</Typography>
                  <TextField
                    id="firstName"
                    name="firstName"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="John"
                    helperText={touched.firstName ? errors.firstName : ''}
                    error={touched.firstName && Boolean(errors.firstName)}
                    value={values.firstName}
                    onChange={handleChange}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Box>
                  <Typography>MI</Typography>
                  <TextField
                  id="middleInit"
                  name="middleInit"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="T"
                  helperText={touched.middleInit ? errors.middleInit : ''}
                  error={touched.middleInit && Boolean(errors.middleInit)}
                  value={values.middleInit}
                  onChange={handleChange}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography>Last Name</Typography>
                  <TextField
                  id="lastName"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="Doe"
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  value={values.lastName}
                  onChange={handleChange}/>
                </Box>
              </Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Typography>Email</Typography>
                  <TextField
                  id="email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="johndoe@gmail.com"
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  value={values.email}
                  onChange={handleChange}/>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography>Phone Number</Typography>
                  <TextField
                  id="phone"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder={"(123) 456-7890"}
                  helperText={touched.phone ? errors.phone : ''}
                  error={touched.phone && Boolean(errors.phone)}
                  value={values.phone ? values.phone : ''}
                  onChange={handleChange}/>
                </Box>
              </Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Typography>Birthday</Typography>
                  <TextField
                  id="birthday"
                  name="birthday"
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.birthday}
                  onChange={handleChange}/>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography>Gender</Typography>
                  <Select
                  id="gender"
                  name="gender"
                  fullWidth
                  variant="outlined"
                  value={values.gender}
                  onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>About me</Typography>
                <TextField
                id="about"
                name="about"
                fullWidth
                multiline
                margin="normal"
                variant="outlined"
                placeholder="Something about you..."
                rows={5}
                helperText={touched.about ? errors.about : ''}
                error={touched.about && Boolean(errors.about)}
                value={values.about ? values.about : ''}
                onChange={handleChange}/>
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button className={classes.submit} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
