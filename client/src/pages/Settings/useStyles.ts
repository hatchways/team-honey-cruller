import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100vw',
    width: '30vw',
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: '3px 0 5px -2px #DDDDDD',
    paddingTop: 20,
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  label: {
    fontSize: '14px',
    left: '20%',
  },
  indicator: {
    left: '10%',
    transform: 'rotate(90deg)',
  },
  paymentDetails: {
    fontSize: '35px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px 0 30px 0',
  },
  tabPanel: {
    width: '80%',
  },
  drawer: {
    width: '50vw',
  },
  expandBtn: {
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid black',
    },
    width: '80vw',
    height: 40,
    borderRadius: 0,
    margin: '5px 0',
    border: '1px solid white',
  },
}));

export default useStyles;
