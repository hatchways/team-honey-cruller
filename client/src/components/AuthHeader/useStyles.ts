import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    padding: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  tattooArt: {
    fontSize: '2em',
    marginLeft: 20,
    letterSpacing: '.4em',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      margin: '0 25 0 24',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  linkContainer: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 49,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  navLink: {
    '&:hover': {
      cursor: 'pointer',
    },
    padding: 5,
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
  },
}));

export default useStyles;
