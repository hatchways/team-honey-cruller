import { useState, ChangeEvent } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import useStyles from './useStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadSubmissionPic, createSubmission } from '../../helpers/APICalls/submission';

export default function SubmitDesign(): JSX.Element {
  const [allPics, setAllPics] = useState<string[]>([]);
  const classes = useStyles();
  const location = useLocation();
  const contestId = location.pathname.slice(15);
  const params = useParams();
  console.log(params);

  const submitNewPic = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append('image', e.target.files[i], e.target.files[i].name);
        }
        const newPic = await uploadSubmissionPic(formData);
        setAllPics([newPic, ...allPics]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const submitAllPics = async () => {
    createSubmission(allPics, contestId);
    // MESSAGE SUCCESS OR FAILURE HERE AND ROUTE TO NEXT PAGE
  };

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <CssBaseline />
      <Grid container alignItems="center" justify="center">
        <Grid container xs={6} className={classes.paperContainer}>
          <Box>
            {allPics.map((pic) => (
              <img key={pic} src={pic} alt={`${pic}tattoo`} className={classes.previewPic} />
            ))}
          </Box>
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
            <Paper elevation={3} className={classes.uploadBox}>
              <Typography variant="h3" className={classes.header}>
                Submit design
              </Typography>
              <CloudUploadIcon fontSize="large" className={classes.icon} />
              <Typography variant="h5" className={classes.chooseFile}>
                Click to choose a file
              </Typography>
              <Typography className={classes.mutedText}>High resolution images</Typography>
              <Typography className={`${classes.bottomLine} ${classes.mutedText}`}>PNG, JPG, GIF</Typography>
            </Paper>
          </label>
          <Button className={classes.uploadBtn} onClick={submitAllPics}>
            submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
