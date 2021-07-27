import { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, MenuItem, Grid, InputAdornment } from '@material-ui/core';
import { ImageList, ImageListItem, CircularProgress } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AlarmIcon from '@material-ui/icons/Alarm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { NewContest } from '../../../interface/Contest';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios';
import $ from 'jquery';
import useStyles from './useStyles';

interface Props {
  handleSubmit: ({ title, description, prizeAmount, deadlineDate, images }: NewContest) => void;
}

export default function CreateContestForm({ handleSubmit }: Props): JSX.Element {
  const [zone, setZone] = useState<string>('PDT');
  const [dogImages, setDogImages] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);
  const classes = useStyles();

  useEffect(() => {
    axios('https://dog.ceo/api/breeds/image/random/20')
      .then((res) => setDogImages(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  const handleImages = (event: React.MouseEvent<HTMLElement>) => {
    const elementImage = (event.target as HTMLImageElement).src;
    const element = event.target;
    if (!$(element).hasClass(classes.checked)) {
      $(element).addClass(classes.checked);
      setImages((prev) => [...prev, elementImage]);
    } else {
      $(element).removeClass(classes.checked);
      const newImages = images.filter((image) => image !== elementImage);
      setImages(newImages);
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        prizeAmount: 0,
        deadlineDate: moment(),
        images: [],
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('This field is required'),
        description: Yup.string().required('This field is required'),
        prizeAmount: Yup.number().integer().positive().required('This field is required'),
        deadlineDate: Yup.date().required('This field is required'),
        images: Yup.array(),
      })}
      onSubmit={(contest) => {
        let newDate = moment();
        if (zone === 'PDT') {
          newDate = contest.deadlineDate.tz('America/Los_Angeles', true);
        } else if (zone === 'CDT') {
          newDate = contest.deadlineDate.tz('America/Chicago', true);
        } else {
          newDate = contest.deadlineDate.tz('America/New_York', true);
        }
        handleSubmit({ ...contest, deadlineDate: newDate, images: images });
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box mt={3} mb={3} className={classes.box}>
            <Typography className={classes.label}>What do you need designed?</Typography>
            <TextField
              id="title"
              name="title"
              margin="normal"
              variant="outlined"
              placeholder="Write a descriptive contest title"
              className={classes.textField}
              helperText={touched.title ? errors.title : ''}
              error={touched.title && Boolean(errors.title)}
              value={values.title}
              onChange={handleChange}
            ></TextField>
          </Box>
          <Box mt={3} mb={3} className={classes.box}>
            <Typography className={classes.label}>Description</Typography>
            <TextField
              id="description"
              name="description"
              margin="normal"
              variant="outlined"
              placeholder="Details about what type of tattoo you want"
              rows={6}
              multiline
              className={classes.textField}
              helperText={touched.description ? errors.description : ''}
              error={touched.description && Boolean(errors.description)}
              value={values.description}
              onChange={handleChange}
            ></TextField>
          </Box>
          <Box mt={3} mb={3} className={classes.box}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography className={classes.label}>Prize amount</Typography>
                <TextField
                  id="prizeAmount"
                  name="prizeAmount"
                  margin="normal"
                  variant="outlined"
                  placeholder="100.00"
                  helperText={touched.prizeAmount ? errors.prizeAmount : ''}
                  error={touched.prizeAmount && Boolean(errors.prizeAmount)}
                  value={values.prizeAmount ? values.prizeAmount : ''}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.label}>Deadline</Typography>
                <Grid container spacing={0}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={5}>
                      <KeyboardDatePicker
                        id="date"
                        name="deadlineDate"
                        margin="normal"
                        variant="inline"
                        inputVariant="outlined"
                        format="MMMM Do YYYY"
                        value={values.deadlineDate}
                        onChange={(value) => setFieldValue('deadlineDate', value)}
                        keyboardIcon={<DateRangeIcon />}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <KeyboardTimePicker
                        id="time"
                        name="deadlineDate"
                        margin="normal"
                        variant="inline"
                        inputVariant="outlined"
                        format="LT"
                        value={values.deadlineDate}
                        onChange={(value) => setFieldValue('deadlineDate', value)}
                        keyboardIcon={<AlarmIcon />}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item xs={2}>
                    <TextField
                      id="zone"
                      name="zone"
                      margin="normal"
                      variant="outlined"
                      select
                      value={zone}
                      onChange={(value) => setZone(value.target.value)}
                    >
                      <MenuItem value="PDT">PDT</MenuItem>
                      <MenuItem value="CDT">CDT</MenuItem>
                      <MenuItem value="EDT">EDT</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3} className={classes.box}>
            <Typography className={classes.label}>Which designs do you like?</Typography>
            <Typography className={classes.sub} component="p">
              {"Let's start by helping your designers understand which styles your prefer."}
            </Typography>
            <Box mt={3} mb={3} className={classes.imageList}>
              <ImageList rowHeight={160} cols={4} className={classes.images}>
                {dogImages.map((image: string, id: number) => (
                  <ImageListItem key={image}>
                    <img id={`${id}`} src={image} className={classes.img} onClick={handleImages} />
                    {$(`#${`${id}`}`).hasClass(classes.checked) && <CheckCircleOutlineIcon className={classes.icon} />}
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
          <Box mt={3} mb={3}>
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Create Contest'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
