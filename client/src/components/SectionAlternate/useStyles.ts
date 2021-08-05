import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(247, 249, 250)',
  },
  inner: {
    maxWidth: 1236,
    width: '100%',
    margin: '0 auto',
  },
  innerNarrowed: {
    maxWidth: 800,
  },
}));

export default useStyles;
