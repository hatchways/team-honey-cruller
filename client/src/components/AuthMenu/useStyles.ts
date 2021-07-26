import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  account: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 70px',
    '&:hover': {
      border: '1px solid white',
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

export default useStyles;
