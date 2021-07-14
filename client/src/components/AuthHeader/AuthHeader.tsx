import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../context/useAuthContext';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import AuthMenu from '../AuthMenu/AuthMenu';

interface Props {
  linkTo: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, btnText }: Props): JSX.Element => {
  const classes = useStyles();
    const { loggedInUser } = useAuth();

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography color="secondary" className={classes.tattooArt}>tattoo art</Typography>
      {loggedInUser ? (
        <Box display="flex" justifyContent="space-between" alignItems="center" minWidth="55vw" flexWrap="wrap" className={classes.linkContainer}>
          <Typography className={classes.navLink} color="secondary" display="inline">Discover</Typography>
          <Typography className={classes.navLink} color="secondary" display="inline">Messages</Typography>
          <Typography className={classes.navLink} color="secondary" display="inline">Notifications</Typography>
          <Link to={linkTo}>
            <Button className={classes.createContestBtn} size="large">{btnText}</Button>
          </Link>
          <Box display="flex" alignItems="center">
            <AvatarDisplay user={loggedInUser} loggedIn={true} />
            <AuthMenu />
          </Box>
        </Box>
      )
      :  (
      <Link to={linkTo}>
        <Button className={classes.loginButton} size="large">
          {btnText}
        </Button>
      </Link>
      )
      }
    </Box>
  );
};

export default AuthHeader;
