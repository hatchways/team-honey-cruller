import { FetchOptions } from '../../interface/FetchOptions';
import { Submission } from '../../interface/User';

export const getContestSubmissions = async (contestId: string): Promise<Submission[]> => {
  const fetchData: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/submission/${contestId}`, fetchData)
    .then((data) => data.json())
    .catch((err) => ({ error: { message: 'Could not find Contest.' } }));
};
