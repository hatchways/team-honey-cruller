import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { chooseWinner } from '../../helpers/APICalls/contest';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';

interface Props {
  artistPic?: string;
  artistName?: string;
  image: string;
  submissionId?: string;
  children: JSX.Element;
}

const ImageModal = ({ artistPic, artistName, image, submissionId, children }: Props): JSX.Element => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleWinnerChoice = () => {
    if (image && submissionId) {
      chooseWinner(image, submissionId)
        .then((res) => {
          if (res.error) {
            updateSnackBarMessage('Contest deadline has not been met yet');
          } else {
            updateSnackBarMessage('Congratulations. Your contest is now closed');
            history.push('/profile');
          }
        })
        .catch((err) => {
          updateSnackBarMessage(err.message);
        });
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
        <Paper className={classes.body}>
          <Box display="flex" alignItems="center" padding={1}>
            {artistPic ? <Avatar src={artistPic} /> : null}
            <Typography className={classes.artistName}>{artistName}</Typography>
            {submissionId ? <Button onClick={handleWinnerChoice}>This is a winner!</Button> : null}
          </Box>
          <img src={image} alt="chosen design" className={classes.image} />
        </Paper>
      </Modal>
    </div>
  );
};

export default ImageModal;
