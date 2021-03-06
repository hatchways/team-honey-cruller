import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: '65vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  previewPic: {
    width: 150,
    height: 150,
    margin: '20px 20px 0',
  },
  uploadBox: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '40px 0',
  },
  header: {
    margin: '3rem 0 2rem',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0',
    },
  },
  icon: {
    fontSize: '10rem',
  },
  fileInputLabel: {
    '&:hover': {
      cursor: 'pointer',
    },
    height: '100%',
    width: '100%',
    marginBottom: '5rem',
  },

  fileInput: {
    display: 'none',
  },
  chooseFile: {
    marginTop: '.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  mutedText: {
    color: 'rgba(0, 0, 0, .5)',
  },
  uploadBtn: {
    backgroundColor: 'white',
    border: '2px solid black',
    color: 'black',
    textTransform: 'uppercase',
    width: '15rem',
    borderRadius: 0,
    padding: '25px 0',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

export default useStyles;
