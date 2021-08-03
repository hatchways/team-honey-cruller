import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem',
    },
  },
  convosContainer: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  userPanel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  heading: {
    marginLeft: 20,
    fontWeight: 900,
  },
  chatTitle: {
    fontWeight: 700,
    fontSize: 20,
    margin: '1rem 0',
  },
  chatSummaryContainer: { overflowY: 'auto', marginTop: '1rem' },
  newChatBtn: {
    margin: '1rem 0',
  },
  noChatToSelectText: {
    margin: '1rem 0',
  },
}));

export default useStyles;
