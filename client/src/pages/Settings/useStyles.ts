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
    width: '40vh',
    overflow: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: '3px 0 5px -2px #DDDDDD',
    paddingTop: 20,
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "flex-start"
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
}));

export default useStyles;