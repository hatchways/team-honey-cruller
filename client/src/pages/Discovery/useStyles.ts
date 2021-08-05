import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  winnerCard: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  winnerWrapper: {
    width: '100%',
  },
  table: {
    margin: '100px 0',
  },
}));

export default useStyles;
