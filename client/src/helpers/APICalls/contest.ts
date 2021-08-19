import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData } from '../../interface/AuthApiData';
import { Contest, Winner } from '../../interface/User';
import { NewContest } from '../../interface/Contest';
import axios from 'axios';

export const uploadContestPic = async (file: FormData): Promise<string> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: file,
  };
  return await fetch(`/api/upload/contest`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getAllContests = async (date?: string, howMany = 10, page = 0): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/contest/?deadlineDate=${date}&howMany=${howMany}&page=${page}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Cannot connect to server' } }));
};

export const getNumContests = async (): Promise<number> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/contest/num`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Cannot connect to server' } }));
};

export const getContestByUser = async (): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/api/users/contests', fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find User Contests' } }));
};

export const getContestById = async (id: string): Promise<Contest> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/contest/${id}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find Contest.' } }));
};

export const addContest = async (contest: NewContest): Promise<AuthApiData> => {
  return await axios
    .post('/api/contest', contest)
    .then((res) => res.data)
    .catch(() => ({ error: { message: 'Cannot create contest.' } }));
};

export const chooseWinner = async (winningPic: string, submissionId: string): Promise<Winner> => {
  const fetchData: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ winningPic }),
  };

  return await fetch(`/api/contest/${submissionId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not complete Contest.' } }));
};
