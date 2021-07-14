import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    position: 'sticky',
    bottom: 5,
    width: '100%',
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
  },
  icon: {
    opacity: 0.2,
    cursor: 'pointer',
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default useStyles;
