import { AuthApiData } from '../../interface/AuthApiData';
import axios from 'axios';

const forgotPassword = async (email: string): Promise<AuthApiData> => {
  return axios.post('/reset', { email: email })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Cannot reach email'}}));
};

export default forgotPassword;
