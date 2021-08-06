import { AuthApiData } from '../../interface/AuthApiData';
import axios from 'axios';

export const forgotPassword = async (email: string): Promise<AuthApiData> => {
  return axios.post('/reset', { email: email })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Cannot reach email'}}));
};

export const resetPassword = async(password: string, token: string, id: string): Promise<AuthApiData> => {
  return axios.patch(`/reset/update-password/${id}`, { password: password, token: token })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Unable to reset password'}}));
};
