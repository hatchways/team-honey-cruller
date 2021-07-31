import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: '0',
  },
  authHeaderText: {
    marginRight: 10,
  },
  poptitle: {
    margin: '15px',
    fontWeight: 'bold',
    fontSize: 25,
  },
  time: {
    marginLeft: 15,
    marginBottom: 20,
  },
  avatar: {
    height: 45,
    width: theme.spacing(6),
    marginTop: 15,
    marginLeft: 15,
  },
  seeAll: {
    marginLeft: 70,
    marginTop: 50,
    fontSize: 15,
  },
  popUpBox: {
    top: '15px !important',
    height: '80%',
  },
}));

export default useStyles;
