import { api } from "./apis";
import { IFilter, ITransfer } from "../globals";

export const filterTransfers = async (token: string, filter: IFilter): Promise<ITransfer[]> => {
  const response = await api.get(`/transfers?userId=${filter.userId}&accountId=${filter.accountId}&startedAt=${filter.startedAt}&endedAt=${filter.endedAt}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  filterTransfers,
}