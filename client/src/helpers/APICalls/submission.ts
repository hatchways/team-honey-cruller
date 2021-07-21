import { FetchOptions } from '../../interface/FetchOptions';
import { Submission } from '../../interface/User';

export const uploadSubmissionPic = async (file: FormData): Promise<string> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: file,
  };
  return await fetch(`/upload/submission`, fetchOptions)
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
  return await fetch(`/contest/${contestId}/submission`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
