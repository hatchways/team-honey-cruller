import { AuthApiData } from '../../interface/AuthApiData';
import { PersonalInfoProps } from '../../interface/PersonalInfo';
import axios from 'axios';

export const postPersonalInfo = async(info: PersonalInfoProps): Promise<AuthApiData> => {
  return await axios.post('/info', info)
    .then((res) => res.data)
    .catch(() => ({ error: { message: 'Failed to save personal information'}}));
};
