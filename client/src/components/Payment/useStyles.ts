import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '800px',
    width: '100%',
  },
  formGrid: {
    height: '100%',
    width: '100%',
  },
  paper: {
    height: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '20px 0',
  },
  cardNum: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #000000',
    borderRadius: '5px',
    maxWidth: 500,
  },
  cardExpiry: {
    width: '150px',
    border: '1px solid #000000',
    marginRight: '20px',
    padding: '10px',
    borderRadius: '5px',
  },
  cardCvc: {
    width: '110px',
    border: '1px solid #000000',
    padding: '10px',
    borderRadius: '5px',
  },
  button: {
    color: '#000000',
    margin: '40px 20px',
    border: '1px solid #000000',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
    width: '15rem',
    [theme.breakpoints.down('xs')]: {
      width: '10rem',
    },
    height: '6rem',
    fontSize: '15px',
  },
}));

export default useStyles;
