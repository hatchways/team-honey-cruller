import { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, MenuItem, Grid, InputAdornment } from '@material-ui/core';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AlarmIcon from '@material-ui/icons/Alarm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import $ from 'jquery';
import useStyles from './useStyles';

export default function CreateContestForm():JSX.Element {
  const [design, setDesign] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prize, setPrize] = useState<string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [zone, setZone] = useState<string | null>('PDT');
  const [images, setImages] = useState<Array<string>>([]);
  const [selectedImages, setSelectedImages] = useState<Array<string>>([]);
  const classes = useStyles();

  useEffect(() => {
    axios('https://dog.ceo/api/breeds/image/random/20')
      .then((res) => setImages(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  const handleImages = (event: React.MouseEvent<HTMLElement>) => {
    const elementImage = (event.target as HTMLImageElement).src;
    const element = event.target;
    if (!$(element).hasClass(classes.checked)) {
      $(element).addClass(classes.checked);
      setSelectedImages(prev => [...prev, elementImage]);
    } else {
      $(element).removeClass(classes.checked);
      const newImages = selectedImages.filter((image) => image !== elementImage);
      setSelectedImages(newImages);
    }
  };

  return (
    <Box>
      <form className={classes.form}>
        <Box mt={3} mb={3} className={classes.box}>
          <Typography className={classes.label}>What do you need designed?</Typography>
          <TextField
          id="design"
          margin="normal"
          variant="outlined"
          placeholder="Write a descriptive contest title"
          className={classes.textField}
          value={design}
          onChange={newDesign => setDesign(newDesign.target.value)}>
          </TextField>
        </Box>
        <Box mt={3} mb={3} className={classes.box}>
          <Typography className={classes.label}>Description</Typography>
          <TextField
          id="description"
          margin="normal"
          variant="outlined"
          placeholder="Details about what type of tattoo you want"
          rows={6}
          multiline
          className={classes.textField}
          value={description}
          onChange={newDesc => setDescription(newDesc.target.value)}>
          </TextField>
        </Box>
        <Box mt={3} mb={3} className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography className={classes.label}>Prize amount</Typography>
              <TextField
              id="prize"
              margin="normal"
              variant="outlined"
              placeholder="100.00"
              value={prize}
              onChange={newPrize => setPrize(newPrize.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                )
              }}>
              </TextField>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.label}>Deadline</Typography>
              <Grid container spacing={0}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={5}>
                    <KeyboardDatePicker
                    id="date"
                    margin="normal"
                    variant="inline"
                    inputVariant="outlined"
                    format="d MMM yyyy"
                    value={date}
                    onChange={newDate => setDate(newDate)}
                    keyboardIcon={<DateRangeIcon />}/>
                  </Grid>
                  <Grid item xs={5}>
                    <KeyboardTimePicker
                    id="time"
                    margin="normal"
                    variant="inline"
                    inputVariant="outlined"
                    value={date}
                    onChange={newDate => setDate(newDate)}
                    keyboardIcon={<AlarmIcon />}/>
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={2}>
                  <TextField
                  id="zone"
                  margin="normal"
                  variant="outlined"
                  select
                  value={zone}
                  onChange={newZone => setZone(newZone.target.value)}>
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
          <Typography className={classes.sub} component='p'>
            Let`&apos`s start by helping your designers understand which styles your prefer.
          </Typography>
          <Box mt={3} mb={3} className={classes.imageList}>
            <ImageList rowHeight={160} cols={4} className={classes.images}>
              {images.map((image: string, id: number) => (
                <ImageListItem key={id}>
                  <img id={`${id}`} src={image} className={classes.img} onClick={handleImages}/>
                  {$(`#${`${id}`}`).hasClass(classes.checked) && <CheckCircleOutlineIcon className={classes.icon}/>}
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        <Box mt={3} mb={3}>
          <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          className={classes.submit}>
            Create Contest
          </Button>
        </Box>
      </form>
    </Box>
  );
};
