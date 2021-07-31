import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    paddingBottom: 20,
  },
}));

export default useStyles;
