import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    height: '125px',
    width: theme.spacing(17),
    marginBottom: '16px',
    marginTop: '20px',
  },
  user: {
    fontSize: 24,
  },
  container: {
    width: '100%',
    marginTop: '15px'
  },
  toolbar: {
    border: 0,
  },
  tabs: {
    color: '#000000',
    textColorPrimary: '#000000',
    width: '100%',
    fontWeight: 'bold',
  },
}));

export default useStyles;
