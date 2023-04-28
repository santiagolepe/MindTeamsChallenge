import { api } from "./apis";
import { IUser } from "../globals";

export const getProfile = async (token: string): Promise<IUser> => {
  const response = await api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchAllUsers = async (token: string): Promise<IUser[]> => {
  const response = await api.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getUser = async (token: string, userId: string): Promise<IUser> => {
  const response = await api.get('/users/' + userId, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};


export const createUser = async (token: string, user: IUser): Promise<IUser> => {
  const response = await api.post('/users', user, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateUser = async (token: string, user: IUser): Promise<IUser> => {
  const response = await api.put(`/users/${user._id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const deleteUser = async (token: string, userId: string): Promise<string> => {
  const response = await api.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getProfile,
}