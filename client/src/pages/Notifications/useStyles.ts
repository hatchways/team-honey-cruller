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
    fontWeight: 'bold',
    fontSize: 25,
    '-webkit-text-stroke': 'medium'
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
    fontSize: 15
  },
  paper: {
    marginTop: 70,
    marginLeft: '25%',
    overflowY: 'hidden',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginLeft: '5%',
    }
  },
  delete: {
    padding: 9,
    border: 'none',
    fontSize: 12,
    marginTop: '17px', 
    color: '#fff', 
    backgroundColor:'black',
    '&:hover' : {
      color: '#fff', 
      backgroundColor:'black',
    }
  }
}));

export default useStyles;
