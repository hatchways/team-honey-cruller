import { makeStyles } from '@material-ui/core/styles';
import HeroImg from '../../Images/heroImg.jpg'

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100%',
    width: '100%',
  },
  typography: {
    fontSize: '50px',
    fontWeight: 'bold',
    borderBottom: '2px #DCDCDC',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    textAlign: 'center',
    color: 'white'
  },
  paper: {
    width: '50%',
  },
  tableContainer: {
    minHeight: '100vh',
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(${HeroImg})`,
    backgroundSize: 'cover',
  },
  expand: {
    marginTop: '10px',
    color: 'white',
    fontSize: '3rem'
  },
  winnerCard: {
      minHeight: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
      },
  },
  h1: {
    color: '#fff'
  },
  tableHead: {
    width: '100%',
  },
  tableRow: {
    padding: '25px 0px 25px 0px',
    textAlign: 'center',
    minWidth: 50,
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
  heroContents: {
    paddingTop: '55vh',
    textAlign: 'center',
    color: 'white'
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
  muiPicker: {
        textAlign: 'center',
        marginTop: '20px'
    }
}));

export default useStyles;
