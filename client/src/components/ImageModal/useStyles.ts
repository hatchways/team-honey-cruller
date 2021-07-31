import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: 'min-content',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    maxHeight: '90%',
    width: '70%',
    [theme.breakpoints.down('sm')]: { width: '85%' },
    padding: 15,
  },
  artistName: {
    textTransform: 'capitalize',
    marginLeft: 20,
    fontWeight: 700,
    fontSize: '2em',
  },
  image: { margin: '15px auto', width: 'inherit', height: 'auto' },
  modal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
}));

export default useStyles;
