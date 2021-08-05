import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  tattooArt: {
    padding: 10,
    textTransform: 'uppercase',
    fontSize: '1rem',
    fontWeight: 900,
    alignSelf: 'center',
    letterSpacing: 8,
  },
}));

export default useStyles;
