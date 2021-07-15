import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {},
  paperContainer: {
    height: '65vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  uploadBox: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '40px 0',
  },
  header: {
    margin: '3rem 0 2rem',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0',
    },
  },
  icon: {
    fontSize: '10rem',
  },
  chooseFile: {
    marginTop: '.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  bottomLine: {
    marginBottom: '2rem',
  },
  uploadBtn: {
    backgroundColor: 'black',
    border: '1px solid white',
    color: 'white',
    textTransform: 'uppercase',
    width: '15rem',
    padding: '25px 0',
  },
}));

export default useStyles;
