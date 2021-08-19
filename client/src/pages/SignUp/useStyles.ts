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
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 23,
  },
  loginContainer: {
    margin: '5vh 0',
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
