import { User } from './User'

export interface PersonalInfoProps {
  firstName: string;
  middleInit: string;
  lastName: string;
  email: string;
  phone: number;
  dateOfBirth: string;
  gender: string;
  about: string;
};

export interface PersonalInfo{
  firstName: string;
  middleInit: string;
  lastName: string;
  email: string;
  phone: number;
  dateOfBirth: string;
  gender: string;
  about: string;
  userId: User
};
