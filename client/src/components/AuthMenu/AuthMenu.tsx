import { useState, MouseEvent } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useAuth } from '../../context/useAuthContext';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

const AuthMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const classes = useStyles();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" onClick={handleClick} className={classes.account}>
        <Typography color="secondary">Account</Typography>
        <IconButton aria-label="show auth menu" aria-controls="auth-menu" aria-haspopup="true" color="secondary">
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleLogout} style={{ marginTop: -7 }} className={classes.menuItem}>
          Logout
        </MenuItem>
        <Link className={classes.link} to="/profile">
          <MenuItem className={classes.menuItem}>Profile</MenuItem>
        </Link>
        <Link className={classes.link} to="/settings">
          <MenuItem className={classes.menuItem}>Settings</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

export default AuthMenu;
