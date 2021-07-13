import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../context/useAuthContext';

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
        <Box justifyContent="space-around">
          <Typography color="secondary">Discover</Typography>
          <Typography color="secondary">Messages</Typography>
          <Typography color="secondary">Notifications</Typography>
          <Button className={classes.createContestBtn}>create contest</Button>
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
