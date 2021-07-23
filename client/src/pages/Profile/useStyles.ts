import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    height: '100%',
  },

  avatar: {
    height: '125px',
    width: theme.spacing(17),
    marginBottom: '16px',
    marginTop: '64px',
  },

  user: {
    fontSize: 24,
  },

  button: {
    color: '#000000',
    margin: '32px',
    border: '1px solid #DCDCDC',
    width: '140px',
    height: '50px',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },

  fileInputLabel: {
    padding: '12px 15px',
  },

  fileInput: {
    display: 'none',
  },

  container: {
    width: '75%',
    marginTop: '32px',
  },

  toolbar: {
    border: 0,
  },

  tabs: {
    color: '#000000',
    textColorPrimary: '#000000',
    width: '100%',
    fontWeight: 'bold',
  },
}));

export default useStyles;
