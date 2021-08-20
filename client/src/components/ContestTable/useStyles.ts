import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100%',
    width: '95%',
    margin: '0 auto',
  },
  typography: {
    fontSize: '50px',
    fontWeight: 'bold',
    borderBottom: '2px #DCDCDC',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    textAlign: 'center',
    color: 'white',
  },
  muiPicker: {
    textAlign: 'center',
    marginTop: '20px',
  },
  paper: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tableHead: {
    width: '100%',
  },
  tableRow: {
    padding: '25px 0px',
    textAlign: 'center',
    minWidth: 50,
  },
  buttonReset: {
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    padding: '3px 7px',
    border: '1px solid black',
    margin: '28px 15px',
    '&:hover': {
      color: 'black',
    },
  },
  button: {
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    padding: '3px 7px',
    border: '1px solid black',
    marginLeft: '10px',
    '&:hover': {
      color: 'black',
    },
  },
}));

export default useStyles;
