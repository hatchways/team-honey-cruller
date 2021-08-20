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
    maxHeight: '80%',
    width: '70%',
    [theme.breakpoints.down('sm')]: { width: '85%' },
    padding: 15,
    borderRadius: 0,
  },
  close: {
    fontSize: '2em',
    opacity: 0.5,
    fontWeight: 700,
    padding: '10px 10px 0 0',
    margin: 'auto 0',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  artistLink: { display: 'flex', alignItems: 'center', padding: 10, textDecoration: 'none', color: 'black' },
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
