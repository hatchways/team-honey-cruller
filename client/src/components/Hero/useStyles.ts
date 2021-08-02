import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      background:
        'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat left bottom',
      backgroundSize: 'contain',
      backgroundColor: 'white',
    },
    cover: {
      position: 'relative',
      zIndex: 9,
      width: '100%',
      height: '100%',
    },
    image: {
      objectFit: 'cover',
    },
  }));

  export default useStyles;