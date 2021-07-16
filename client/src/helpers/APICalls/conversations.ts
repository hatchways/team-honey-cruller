import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData } from '../../interface/AuthApiData';
import { Convo } from '../../interface/User';

interface Message {
  _id: string;
  conversation: string;
  to: string;
  from: string;
  body: string;
  createdAt: string;
}

export const getAllConvos = async (): Promise<Convo[]> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/api/conversation', fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};

export const getOneConvo = async (friendId: string): Promise<Convo> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/conversation/${friendId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};

export const sendMessage = async (message: Message): Promise<AuthApiData> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(message),
  };

  return await fetch(`/api/conversation`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};
