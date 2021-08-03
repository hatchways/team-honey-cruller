import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '10px 2rem 10px 10px',
  },
  usernameDate: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bubble: {
    border: '1px solid rgba(0, 0, 0, .2)',
    borderRadius: '0 10px 10px 10px',
    minWidth: 'min-content',
    margin: '10px 2rem 10px 10px',
    [theme.breakpoints.down('sm')]: {
      margin: 10,
    },
  },
  text: {
    fontSize: '1rem',
    fontWeight: 700,
    padding: 8,
  },
}));

export default useStyles;
