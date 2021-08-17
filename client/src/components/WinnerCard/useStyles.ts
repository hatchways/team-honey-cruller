import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(-2),
        marginLeft: theme.spacing(-2),
      },
    },
    folioItem: {
      position: 'relative',
      overflow: 'hidden',
      marginBottom: theme.spacing(2),
      '&:last-child': {
        marginBottom: 0,
      },
      '&:hover': {
        '& .folio__image': {
          transform: 'scale(1.2)',
        },
      },
    },
    image: {
      transitionDuration: '.7s',
      transform: 'scale(1.0)',
      minHeight: 300,
      objectFit: 'cover',
      [theme.breakpoints.up('md')]: {
        minHeight: 500,
      },
    },
    folioInfoWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 2%, #000000)',
      padding: theme.spacing(4, 2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
      },
    },
    folioTitle: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    folioSubtitle: {
      color: 'white',
      textTransform: 'capitalize',
      margin: theme.spacing(1, 0),
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
    leftGrid: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1),
        marginBottom: 0,
      },
    },
    rightGrid: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
      },
    },
  }));

  export default useStyles;