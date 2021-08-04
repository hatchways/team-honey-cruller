import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(4),
      },
    },
    disableGutter: {
      marginBottom: 0,
    },
    title: {
      fontWeight: 'bold',
    },
    cta: {
      marginLeft: theme.spacing(1),
      '&:first-child': {
        marginLeft: theme.spacing(0),
      },
    },
  }));

  export default useStyles;