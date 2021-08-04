import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '22px',
    textTransform: 'capitalize',
  },
}));

export default useStyles;
