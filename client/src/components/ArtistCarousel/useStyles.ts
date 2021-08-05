import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
    height: 'auto'
  },
  paper: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(7),
    width: '95%',
    height: theme.spacing(30),
  },
  username: {
    marginTop: theme.spacing(4), 
    marginLeft: theme.spacing(4), 
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2) 
  },
  date:{
    marginTop: theme.spacing(2) 
  }
}));

export default useStyles;
