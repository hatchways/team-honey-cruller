import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    minHeight: '100vh',
  },
  chatContainer: {
    display: 'flex',
    marginLeft: 41,
    marginRight: 41,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    overflowY: 'scroll',
    maxHeight: '80vh',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

export default useStyles;
