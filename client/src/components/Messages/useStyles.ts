import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    height: '100%',
  },
}));

export default useStyles;
