import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import apiTransfer from '../services/transfers';
import { IFilter, ITransfer } from '../globals';

interface TransfersState {
  transfers: ITransfer[];
  loading  : boolean;
  error    : string | null;
}

const initialState: TransfersState = {
  transfers: [],
  loading  : false,
  error    : null,
};

export const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTransfers: (state, action: PayloadAction<ITransfer[]>) => {
      state.transfers = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});


export const filterTransfers = (filter: IFilter): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const token = getState().auth.token;

  try {
    const transfers = await apiTransfer.filterTransfers(token!, filter);
    dispatch(setTransfers(transfers));
  } catch (error) {
    dispatch(setError('Error fetching transfers.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectTransfers = (state: RootState): any[] => state.transfers.transfers;
export const selectTransfersLoading = (state: RootState): boolean => state.transfers.loading;
export const selectTransfersError = (state: RootState): string | null => state.transfers.error;
export const { setLoading, setTransfers, setError } = transfersSlice.actions;

export default transfersSlice.reducer;
