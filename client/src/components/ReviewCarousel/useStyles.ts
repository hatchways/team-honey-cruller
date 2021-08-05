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
  avatar: {
    height: theme.spacing(11),
    width: theme.spacing(10),
  },
  username: {
    marginTop: theme.spacing(4), 
    marginLeft: theme.spacing(4), 
    fontWeight: 'bold'
  },
  rating:{
    marginBottom: theme.spacing(1)
  }
}));

export default useStyles;
