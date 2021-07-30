import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: '1rem',
    padding: 8,
    fontWeight: 700,
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
    margin: '10px 2rem 10px 10px',
    [theme.breakpoints.down('sm')]: {
      margin: 10,
    },
    border: '1px solid rgba(0, 0, 0, .2)',
    width: 'fit-content',
  },
  avatar: {
    height: 25,
    width: 25,
    marginTop: 6,
  },
}));

export default useStyles;
