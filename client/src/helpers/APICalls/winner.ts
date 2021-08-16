import { FetchOptions } from '../../interface/FetchOptions';
import { Winner } from '../../interface/User';

export const getWinnersByUser = async (): Promise<Winner[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return await fetch(`/api/winners`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getSomeWinners = async (num: number): Promise<Winner[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return await fetch(`/api/winners/${num}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
