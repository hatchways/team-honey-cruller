import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    padding: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  accAside: {
    fontSize: 14,
    color: '#b0b0b0',
    fontWeight: 400,
    textAlign: 'center',
    marginRight: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  link: { textDecoration: 'none' },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#3a8dff',
    boxShadow: 'none',
    marginRight: 35,
  },
  tattooArt: {
    fontSize: '2em',
    marginLeft: 20,
    letterSpacing: '.4em',
    textTransform: 'uppercase',
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
    width: '10vw',
  },
}));

export default useStyles;
