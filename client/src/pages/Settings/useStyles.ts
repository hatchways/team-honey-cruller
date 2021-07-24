import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 200,
    width: '20vw',
    height: 'auto',
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
  paymentDetails: {
    fontSize: '35px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px 0 30px 0',
    marginLeft: '58px'
  }
}));

export default useStyles;