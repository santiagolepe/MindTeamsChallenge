import { auth, api } from './apis';
import { IUser, ILoginResponse } from '../globals';

export async function login(email: string, password: string): Promise<string> {
  const { data } = await auth.post<ILoginResponse>('/login', { email, password });

  return data.token;
}

export const getProfile = async (token: string): Promise<IUser> => {
  const response = await api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const logout = async (token: string): Promise<boolean> => {
  await auth.post('/logout', null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return true;
};
