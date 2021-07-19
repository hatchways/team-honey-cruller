import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

interface NewUserData {
  profilePic?: string;
  username?: string;
  email?: string;
}

const updateProfile = async (user: NewUserData): Promise<User> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(user),
  };
  return await fetch(`/users/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfile;
