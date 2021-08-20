import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  activity: {
    margin: 0,
    fontWeight: 900,
    paddingTop: 70,
  },
  avatar: {
    height: theme.spacing(6),
    width: theme.spacing(5),
  },
  paper: {
    display: 'flex',
    width: '50%',
    background: '#fafafa',
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  formPaper: {
    marginTop: '120px',
    backgroundColor: '#fafafa',
  },
  readAll: {
    marginTop: '100px',
  },
  username: {
    marginTop: '10px',
    marginLeft: '5px',
    fontWeight: 'bold',
  },
}));

export default useStyles;
