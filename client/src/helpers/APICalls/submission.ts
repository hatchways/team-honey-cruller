import { FetchOptions } from '../../interface/FetchOptions';
import { Submission } from '../../interface/User';
import { submissionByArtist } from '../../interface/User';

export const uploadSubmissionPic = async (file: FormData): Promise<string> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: file,
  };
  return await fetch(`/api/upload/submission`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const createSubmission = async (images: string[], contestId: string): Promise<Submission> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(images),
  };
  return await fetch(`/api/submission/${contestId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getContestSubmissions = async (contestId: string): Promise<Submission[]> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/submission/${contestId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find Contest.' } }));
};

export const getUserSubmissions = async (): Promise<Submission[]> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/submission`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find Contest.' } }));
};

export const getartistSubmission = async (artistId: string): Promise<submissionByArtist[]> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/api/submission/artist/${artistId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not get submission.' } }));
};
