import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      cursor: 'pointer',
    },
    height: 'min-content',
    padding: 10,
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  by: {
    display: 'flex',
    justifyContent: 'center',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default useStyles;
