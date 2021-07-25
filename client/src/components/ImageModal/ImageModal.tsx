import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

interface Props {
  artistPic?: string;
  artistName?: string;
  image: string;
  children: JSX.Element;
}

const ImageModal = ({ artistPic, artistName, image, children }: Props): JSX.Element => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
        <Paper className={classes.body}>
          <Box className={classes.box}>
            {artistPic ? <Avatar src={artistPic} /> : null}
            <Typography>{artistName}</Typography>
          </Box>
          <img src={image} alt="chosen design" className={classes.image} />
        </Paper>
      </Modal>
    </div>
  );
};

export default ImageModal;
