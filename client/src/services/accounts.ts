import { api } from "./apis";
import { IAccount } from "../globals";

export const fetchAllAccounts = async (token: string): Promise<IAccount[]> => {
  const response = await api.get('/accounts', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const createAccount = async (token: string, account: IAccount): Promise<IAccount> => {
  const response = await api.post('/accounts', account, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateAccount = async (token: string, account: IAccount): Promise<IAccount> => {
  const response = await api.put(`/accounts/${account._id}`, account, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const deleteAccount = async (token: string, accountId: string): Promise<string> => {
  const response = await api.delete(`/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const addUserTeam = async (token: string, accountId: string, userId: string): Promise<string> => {
  const response = await api.patch(`/accounts/${accountId}/add-user/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const removeUserTeam = async (token: string, accountId: string, userId: string): Promise<string> => {
  const response = await api.patch(`/accounts/${accountId}/remove-user/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  addUserTeam,
  removeUserTeam,
}