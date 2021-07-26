import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

import { Notification } from '../../interface/User';

type existingNotification = Notification;

export const getNotification = async (): Promise<Notification[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { message: 'Unable to get notifications', err },
    }));
};

export const updateNotification = async (eNotification: existingNotification): Promise<Notification[]> => {
  eNotification.opened = true;
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(eNotification),
  };

  return await fetch(`/notification/update/${eNotification._id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { message: 'Unable to update notifications', err },
    }));
};

export const deleteNotification = async (id: string): Promise<number> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/notification/${id}`, fetchOptions)
    .then((res) => res.status)
    .catch((err) => err.status);
};
