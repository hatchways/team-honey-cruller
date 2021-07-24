import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: '0 5px',
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
}));

export default useStyles;
