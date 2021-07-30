import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData } from '../../interface/AuthApiData';
import { Convo, Message } from '../../interface/User';
import { OtherUser } from '../../interface/Convo';

interface NewMessage {
  to: string;
  message: string;
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

export const getOneConvo = async (friendId: string): Promise<Message[] | OtherUser> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/conversation/${friendId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};

export const sendMessage = async (message: NewMessage): Promise<Message> => {
  const fetchData: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(message),
  };

  return await fetch(`/api/conversation`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Can not connect to server' } }));
};
