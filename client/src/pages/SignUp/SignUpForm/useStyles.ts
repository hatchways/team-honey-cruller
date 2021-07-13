import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textField: {
    margin: 0,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, .1)',
    borderStyle: 'solid',
  },
  label: {
    fontSize: '1em',
    color: 'rgb(0,0,0,0.7)',
    paddingLeft: '5px',
  },
  inputs: {
    margin: '.4rem 0',
    height: '2rem',
    padding: '5px',
    borderRadius: 0,
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: 0,
    color: 'white',
  },
}));

export default useStyles;
