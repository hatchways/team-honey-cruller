import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  account: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
