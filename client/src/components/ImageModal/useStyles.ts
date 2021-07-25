import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '70%',
    width: '70%',
    padding: 15,
  },
  box: {
    padding: 10,
  },
  image: { margin: 'auto', width: 'inherit', height: 'inherit' },
  modal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
}));

export default useStyles;
