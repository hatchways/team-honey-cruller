import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  account: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link: {
    textDecoration: 'none', 
    color: 'black'
  }
}));

export default useStyles;
