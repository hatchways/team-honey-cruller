import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    position: 'sticky',
    bottom: 5,
    width: '100%',
  },
  inputContainer: {
    height: '10vh',
    borderTop: '1px solid rgba(0,0,0,0.2)',
    padding: '0 30px',
  },
  input: {
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    width: '100%',
    padding: '15px 0',
  },
  sendBtn: {
    borderRadius: 0,
    backgroundColor: '#000',
    border: '1px solid black',
    color: 'white',
    width: '100%',
    height: '100%',
    '&:hover': {
      color: 'black',
    },
  },
}));

export default useStyles;
