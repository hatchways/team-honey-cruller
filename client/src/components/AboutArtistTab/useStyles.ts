import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  activity: {
    margin: 0,
    fontWeight: 900,
    paddingTop: 70,
  },
  heading: {
    WebkitTextStroke: 'medium',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
  },
  contentMarginsLeft: {
    marginLeft: 15,
  },
  contentMarginsTop: {
    marginTop: 10,
    fontSize: 18,
  },
  root: {
    backgroundColor: '#fafafa',
  },
  about: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    fontWeight: 'bold',
  },
}));

export default useStyles;
