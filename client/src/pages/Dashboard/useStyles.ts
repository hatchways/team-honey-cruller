import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  container: {
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    backgroundColor: '#FFFFFF',
    flex: 9,
    height: 'calc(100vh - 400px)',
  },
  drawerWrapper: {
    maxHeight: '100%',
  },
  chatWrapper: {
    height: '100%',
  },
  paper: {
    maxHeight: '100%',
  },
}));

export default useStyles;
