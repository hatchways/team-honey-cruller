import { AuthApiData } from '../../interface/AuthApiData';
import axios from 'axios';

export const forgotPassword = async (email: string): Promise<AuthApiData> => {
  return axios.post('/api/reset', { email: email })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Cannot reach email'}}));
};

export const resetPassword = async(password: string, token: string, id: string): Promise<AuthApiData> => {
  return axios.patch(`/api/reset/update-password/${id}`, { password: password, token: token })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Unable to reset password'}}));
};

export const changePassword = async(password: string): Promise<AuthApiData> => {
  return axios.patch('/api/reset/change-password', { password: password })
    .then((res) => res.data)
    .catch(() => ({error: {message: 'Unable to change password'}}));
};
