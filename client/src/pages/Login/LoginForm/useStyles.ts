import { makeStyles } from '@material-ui/core/styles';
import { visitEachChild } from 'typescript';

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
    border: '0.5 solid rgba(0, 0, 0, .1)',
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
    borderRadius: 0,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#000',
    fontWeight: 'bold',
  },
  reset: {
    textDecoration: 'none',
    color: 'rgb(6,69,173)',
    "&:hover": {
      textDecoration: 'underline',
    }
  },
}));

export default useStyles;
