import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    padding: '2.5rem',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      padding: '1.5rem',
    },
    flex: 1,
  },
  tattooArt: {
    fontSize: '2em',
    marginLeft: 20,
    letterSpacing: '.4em',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      margin: '0 25 0 24',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  linkContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginLeft: 49,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  navLink: {
    '&:hover': {
      cursor: 'pointer',
    },
    padding: 5,
    textDecoration: 'none',
  },
  loginButton: {
    color: 'white',
    border: '1px solid white',
    marginRight: 20,
    borderRadius: 0,
    width: '10rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 51px 0 51px',
    },
  },
  createContestBtn: {
    borderRadius: 0,
    border: '1px solid white',
    color: 'white',
    width: '10rem',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 15,
    },
  },
}));

export default useStyles;
