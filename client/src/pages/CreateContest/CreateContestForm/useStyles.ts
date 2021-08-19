import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
  },
  box: {
    width: '65%',
  },
  submit: {
    padding: 10,
    width: 200,
    borderRadius: 0,
    height: 60,
    fontSize: 14,
  },
  imageList: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 450,
    border: '0.5px solid #DDDDDD',
    borderRadius: 5,
    padding: '20px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
    },
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
  },
  fileInputLabel: {
    '&:hover': {
      cursor: 'pointer',
    },
    height: '100%',
    width: '100%',
  },
  fileInput: { display: 'none' },
  uploadBtn: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 0,
    border: '1px solid black',
    '&&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    height: '100%',
    width: '10rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  img: {
    width: '95%',
    height: '95%',
    cursor: 'pointer',
  },
  checked: {
    filter: 'brightness(50%)',
  },
  sub: {
    marginTop: 10,
    color: '#AAAAAA',
  },
  icon: {
    display: 'block',
    position: 'relative',
    width: '50%',
    height: '50%',
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: 115,
  },
}));

export default useStyles;
