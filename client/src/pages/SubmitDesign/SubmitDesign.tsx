import { useState, ChangeEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import useStyles from './useStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadSubmissionPic, createSubmission } from '../../helpers/APICalls/submission';
import { getContestById } from '../../helpers/APICalls/contest';
import { createNotification } from '../../helpers/APICalls/notification';
import { useSnackBar } from '../../context/useSnackbarContext';

import { useSocket } from '../../context/useSocketContext';
import { useAuth } from '../../context/useAuthContext';

interface Params {
  id: string;
}

export default function SubmitDesign(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();

  const [allPics, setAllPics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const params = useParams<Params>();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

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
        const newPic = await uploadSubmissionPic(formData);
        setAllPics([newPic, ...allPics]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const submitAllPics = async () => {
    try {
      const submission = await createSubmission(allPics, params.id);
      if (submission) {
        updateSnackBarMessage(`Successfully submitted design${allPics.length > 1 ? 's' : ''}`);
        //get the contest creator's details
        const toUser = await getContestById(params.id);
        //create notification
        const notificationBody = {
          to: toUser.userId,
          notification: `${loggedInUser?.username} submitted in your contest`,
          contestId: params.id,
        };
        const notification = await createNotification(notificationBody);
        //send notification using socket
        socket?.emit('sendNotification', notification);
        history.push(`/contest/${params.id}`);
      }
    } catch (err: any) {
      updateSnackBarMessage(err.message);
    }
  };

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <CssBaseline />
      <Grid container alignItems="center" justifyContent="center">
        <Grid container xs={6} className={classes.paperContainer}>
          <Box>
            {loading ? (
              <CircularProgress />
            ) : (
              allPics.map((pic) => <img key={pic} src={pic} alt={`${pic}tattoo`} className={classes.previewPic} />)
            )}
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
              <Typography className={classes.mutedText}>PNG, JPG, GIF</Typography>
            </Paper>
          </label>
          <Button disabled={loading ? true : false} className={classes.uploadBtn} onClick={submitAllPics}>
            {loading ? <CircularProgress /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
