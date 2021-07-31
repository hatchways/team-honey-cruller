import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    borderTop: 'rgba(0, 0, 0, .1)',
    borderBottom: 'rgba(0, 0, 0, .1)',
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  online: {
    backgroundColor: '#1CED84',
  },
  sidebar: {
    marginLeft: 17,
  },
  date: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
    marginRight: 15,
  },
}));

export default useStyles;
