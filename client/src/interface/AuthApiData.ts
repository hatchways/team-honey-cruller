import { User, Contest } from './User';


export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
  contests?: [Contest]
}

export interface AuthApiId {
  contest?: Contest;
  error?: { message: string };
  success?: AuthApiDataSuccess;
}