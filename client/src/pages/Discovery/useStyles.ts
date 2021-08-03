import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  winnerCard: {
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
      },
  },
    table: {
      margin: '100px 0'
    }
}));

export default useStyles;
