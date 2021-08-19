import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    maxWidth: '100%',
  },
  paper: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(7),
    width: '95%',
    height: theme.spacing(30),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatar: {
    height: theme.spacing(11),
    width: theme.spacing(10),
  },
  username: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    fontWeight: 'bold',
  },
  rating: {
    alignSelf: 'center',
    marginBottom: theme.spacing(1),
  },
  reviewText: {
    alignSelf: 'center',
  },
}));

export default useStyles;
