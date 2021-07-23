import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData, ContestById } from '../../interface/AuthApiData';
import { Contest } from '../../interface/Contest';
import axios from 'axios';

export const getAllContests = async (): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/contest', fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};

export const getContestByUser = async (): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/users/contests', fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find User Contests' } }));
};
//receives id as param
export const getContestById = async (id: string): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/contest', fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find Contest.' } }));
};

export const addContest = async (contest: Contest): Promise<AuthApiData> => {
  return await axios
    .post('/contest', contest)
    .then((res) => res.data)
    .catch(() => ({ error: { message: 'Cannot create contest' } }));
};
