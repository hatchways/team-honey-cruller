import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textWhite: {
      color: 'white',
    },
    card: {
      '& .MuiCardContent-root': {
        justifyContent: 'space-between',
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(-12),
        '& .MuiCardContent-root': {
          padding: theme.spacing(11, 5),
        },
      },
    },
    cardTitle: {
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
    avatar: {
      width: 100,
      height: 100,
      boxShadow: '5px 11px 20px 0px rgba(0, 0, 0, 0.25)',
    },
    listItemAvatar: {
      marginRight: theme.spacing(4),
    },
  }));

  export default useStyles;
