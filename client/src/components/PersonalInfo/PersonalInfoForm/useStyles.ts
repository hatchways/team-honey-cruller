import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  submit: {
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    border: '1px solid black',
    padding: 10,
    width: '10vw',
    borderRadius: 0,
  },
  select: {
    top: 15,
  },
}));

export default useStyles;
