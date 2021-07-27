import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  return <Avatar alt="Profile Image" src={user ? user.profilePic : `https://robohash.org/bob@email.com.png`} />;
};

export default AvatarDisplay;
