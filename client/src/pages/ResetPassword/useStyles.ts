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
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  link: {
    border: '1px solid black',
    borderRadius: 5,
    padding: 5,
    textDecoration: 'none',
    color: '#EEEEEE',
    backgroundColor: '#111111',
    '&:hover': {
      backgroundColor: 'gray'
    }
  }
}));

export default useStyles;
