import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  activeChat: {
    height: '100%',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 20px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    height: '100%',
    overflowY: 'scroll',
  },
}));

export default useStyles;
