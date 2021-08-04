import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: 'auto',
    height: '40rem',
  },
  avatar: {
    margin: '32px',
    height: theme.spacing(40),
    width: theme.spacing(40),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%',
      height: 'auto',
    },
  },
  grid: {
    marginLeft: '32px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '22px',
  },
  contestInfo: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  container: {
    height: 'auto',
    marginTop: '32px',
    color: '#3A8DFF',
  },
  button: {
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    padding: '8px 16px',
    marginLeft: '-20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  contestContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  noneAvailable: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
}));

export default useStyles;
