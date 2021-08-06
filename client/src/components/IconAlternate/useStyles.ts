import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    extraSmall: {
      width: 20,
      height: 20,
    },
    small: {
      width: 50,
      height: 50,
    },
    medium: {
      width: 70,
      height: 70,
    },
    large: {
      width: 90,
      height: 90,
    },
    circle: {
      borderRadius: '100%',
    },
    square: {
      borderRadius: theme.spacing(2),
    },
  }));
  
  export default useStyles;