import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'contain',
    backgroundColor: 'white',
  },
  cover: {
    position: 'relative',
    zIndex: 9,
    width: '100%',
    height: '100%',
  },
  image: {
    objectFit: 'cover',
  },
  sectionHeader: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
}));

export default useStyles;
