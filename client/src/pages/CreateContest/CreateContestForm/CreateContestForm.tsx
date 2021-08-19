import { useState, ChangeEvent } from 'react';
import { Button, TextField, Box, Typography, MenuItem, Grid, InputAdornment } from '@material-ui/core';
import { ImageList, ImageListItem, CircularProgress } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AlarmIcon from '@material-ui/icons/Alarm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { NewContest } from '../../../interface/Contest';
import { uploadContestPic } from '../../../helpers/APICalls/contest';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Array<string>>([]);
  const classes = useStyles();

  const submitNewPic = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      try {
        const formData = new FormData();
        if (!formData) {
          setLoading(false);
        }
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append('image', e.target.files[i], e.target.files[i].name);
        }
        const newPic = await uploadContestPic(formData);
        setImages([newPic, ...images]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
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
        } else if (zone === 'MDT') {
          newDate = contest.deadlineDate.tz('America/Denver', true);
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
                      <MenuItem value="MDT">MDT</MenuItem>
                      <MenuItem value="CDT">CDT</MenuItem>
                      <MenuItem value="EDT">EDT</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3} className={classes.box}>
            <Box display="flex" justifyContent="space-between" alignContent="center">
              <Box>
                <Typography className={classes.label}>Show us some inspiration for your dream tattoo</Typography>
                <Typography className={classes.sub} component="p">
                  Upload your images.
                </Typography>
              </Box>
              <Box maxWidth="50%">
                <label htmlFor="file" className={classes.fileInputLabel}>
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    name="image"
                    multiple={false}
                    onChange={submitNewPic}
                    className={classes.fileInput}
                  />
                  <div className={classes.uploadBtn}>upload</div>
                </label>
              </Box>
            </Box>
            <Box mt={3} mb={3} className={classes.imageList}>
              <ImageList rowHeight={160} cols={4} className={classes.images}>
                {loading ? (
                  <CircularProgress style={{ height: '40%', width: '40%' }} />
                ) : (
                  images.map((image: string, id: number) => (
                    <ImageListItem key={image}>
                      <img id={`${id}`} src={image} className={classes.img} />
                      {$(`#${`${id}`}`).hasClass(classes.checked) && (
                        <CheckCircleOutlineIcon className={classes.icon} />
                      )}
                    </ImageListItem>
                  ))
                )}
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
