import { SessionUser } from '.';
import { api } from '../axios';
import { SignInData, SignUpData } from './types';

export const signIn = async (
  userData: SignInData
): Promise<{ token: string }> => {
  const response = await api.post('auth/sign-in', userData);

  return response.data;
};

export const signUp = async (
  userData: SignUpData
): Promise<{ token: string }> => {
  const response = await api.post('auth/sign-up', userData);

  return response.data;
};

export const getMe = async (): Promise<SessionUser> => {
  const response = await api.get('user/me');
  console.log(response.data);

  return response.data;
};
