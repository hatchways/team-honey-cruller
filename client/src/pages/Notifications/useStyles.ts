import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: '0',
  },
  poptitle: {
    margin: 20,
    fontSize: 25,
    '-webkit-text-stroke': 'medium',
  },
  time: {
    marginLeft: 15,
    marginBottom: 20,
  },
  avatar: {
    height: 45,
    width: theme.spacing(6),
    marginTop: 15,
    marginLeft: 15,
  },
  seeAll: {
    marginLeft: 70,
    marginTop: 50,
    fontSize: 15,
  },
  paper: {
    marginTop: '5%',
    overflowY: 'hidden',
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: '5%',
      marginRight: '5%',
    },
    [theme.breakpoints.only('xl')]: {
      width: '40%',
      marginLeft: '2%',
      marginRight: '5%',
    },
  },
  delete: {
    padding: 9,
    border: 'none',
    fontSize: 12,
    marginTop: '17px',
    color: '#fff',
    backgroundColor: 'black',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'black',
    },
  },
  notificationContainer: {
    '&:hover': {
      backgroundColor: '#fafafa',
      color: 'black',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

export default useStyles;
