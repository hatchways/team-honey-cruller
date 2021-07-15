import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    width: '20%',
    marginLeft: 15,
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: '3px 0 5px -2px #DDDDDD',
    paddingTop: 20,
  },
  tab: {
    fontSize: '14px',
  },
  indicator: {
    left: 0,
    height: '1px',
    transform: 'rotate(90deg)',
  },
}));

export default useStyles;