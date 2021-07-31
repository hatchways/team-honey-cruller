import { makeStyles } from '@material-ui/core/styles';
import HeroImg from '../../Images/heroImg.jpg'

const useStyles = makeStyles(() => ({
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
  },
  paper: {
    width: '50%',
  },
  tableContainer: {
    marginBottom: '50px',
    marginTop: '50px',
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
  heroImage: {
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(${HeroImg})`,
    backgroundSize: 'cover',
    height: '50vh',
    width: '63vw',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    marginBottom: '15px'
  },
  heroContents: {
    paddingTop: '275px',
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
