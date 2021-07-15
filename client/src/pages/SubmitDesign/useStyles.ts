import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    backgroundColor: 'pink',
    alignItems: 'stretch',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 200,
    width: 200,
    backgroundColor: 'green',
  },
}));

export default useStyles;
