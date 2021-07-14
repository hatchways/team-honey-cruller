import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    height: '65vh',
    [theme.breakpoints.down('md')]: {
      height: '65vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '60vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '48vh',
    },
  },
}));

export default useStyles;
