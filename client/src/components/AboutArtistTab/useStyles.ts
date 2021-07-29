import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '240px',
    padding: 10,
  },
  heading: {
    WebkitTextStroke: 'medium',
    marginTop: 10,
    marginBottom: 10,
  },
  contentMarginsLeft: {
    marginLeft: 15 
  },
  contentMarginsTop: {
    marginTop: 10 
  },

}));

export default useStyles;
