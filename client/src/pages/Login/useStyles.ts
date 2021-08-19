import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    display: 'flex',
    justifyContent: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    color: 'white',
  },
  loginContainer: {
    margin: '5vh 0',
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    // minHeight: '100vh',
    paddingTop: 23,
  },
  welcome: {
    fontSize: '3em',
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 900,
    fontFamily: "'Open Sans'",
  },
}));

export default useStyles;
