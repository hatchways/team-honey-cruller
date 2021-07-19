import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

const updateProfile = async (file: File): Promise<User> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(file),
  };
  return await fetch(`/upload/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfile;
