import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';

interface Props {
  linkTo: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography color="secondary" className={classes.tattooArt}>TATTOO ART</Typography>
      <Link to={linkTo}>
        <Button className={classes.loginButton} size="large">
          {btnText}
        </Button>
      </Link>
    </Box>
  );
};

export default AuthHeader;
