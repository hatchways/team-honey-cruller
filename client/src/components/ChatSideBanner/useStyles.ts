import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    padding: '1rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 2rem',
    },
  },
  userPanel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  heading: {
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
