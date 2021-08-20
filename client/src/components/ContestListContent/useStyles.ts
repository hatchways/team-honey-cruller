import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'auto',
    marginTop: '32px',
    color: '#3A8DFF',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '22px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  contestInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      alignSelf: 'center',
    },
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  button: {
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid #000000',
    padding: '8px 16px',
    borderRadius: 0,
    marginLeft: '-20px',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
}));

export default useStyles;
