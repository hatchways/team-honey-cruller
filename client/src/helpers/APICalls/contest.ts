import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData, AuthApiId } from '../../interface/AuthApiData';

export const getAllContests = async (): Promise<AuthApiData> => {
    const fetchData: FetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }
    
    return await fetch('/contest', fetchData)
        .then(data => data.json())
        .catch(err => ({ error: { message: 'Can not connect to server' } }))
}

export const getContestByUser = async (): Promise<AuthApiData> => {
    const fetchData: FetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    return await fetch('/users/profile', fetchData)
    .then(data => data.json()).catch(err => ({ error: { message: 'Could not find User Contests'}}))
}

