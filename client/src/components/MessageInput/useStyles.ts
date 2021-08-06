import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    position: 'sticky',
    bottom: 5,
    width: '100%',
  },
  inputContainer: {
    height: '100px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  input: {
    borderRadius: 5,
    width: '100%',
  },
}));

export default useStyles;
