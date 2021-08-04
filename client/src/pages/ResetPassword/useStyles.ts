import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  form: {
    padding: 10,
    width: '25%',
    minWidth: '20%',
  },
}));

export default useStyles;
