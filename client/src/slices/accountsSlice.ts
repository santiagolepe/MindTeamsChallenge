import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import apiAccount from '../services/accounts';
import apiUser from '../services/users';
import { selectToken } from './authSlice';
import { IUser, IAccount } from '../globals';

interface AccountsState {
  accounts: IAccount[];
  loading : boolean;
  error   : string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading : false,
  error   : null,
};

// reducer and extra-reducers for acconuts
export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAccounts: (state, action: PayloadAction<IAccount[]>) => {
      state.accounts = action.payload;
    },
    setAccount: (state, action: PayloadAction<IAccount>) => {
      state.accounts = [action.payload, ...state.accounts];
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAccount.fulfilled, (state, action) => {
      state.accounts.push(action.payload);
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.accounts = state.accounts.filter((account) => account._id !== action.payload);
    });
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      const updatedAccount = action.payload;
      const index = state.accounts.findIndex((account) => account._id === updatedAccount._id);
      if (index !== -1) state.accounts[index] = updatedAccount;
    });
    builder.addCase(removeUserTeam.fulfilled, (state, action) => {
      const index = state.accounts.findIndex((account) => account._id === action.payload.accountId);
      if (index !== -1) {
        state.accounts[index].team = state.accounts[index].team.filter((user) => user._id !== action.payload.userId)
      }
    });
    builder.addCase(addUserTeam.fulfilled, (state, action) => {
      const index = state.accounts.findIndex((account) => account._id === action.payload.accountId);
      if (index !== -1) {
        state.accounts[index].team.push(action.payload.user);
      }
    });
  },
});

export const fetchAccounts = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const token = getState().auth.token;

  try {
    const accounts = await apiAccount.fetchAllAccounts(token!);
    dispatch(setAccounts(accounts));
  } catch (error) {
    dispatch(setError('Error fetching accounts.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addAccount = createAsyncThunk('accounts/addAccount', async (account: any, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      let newAccount = await apiAccount.createAccount(token!, account);
      
      return newAccount;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (account: any, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      let updatedAccount = await apiAccount.updateAccount(token!, account);
      
      return updatedAccount;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (accountId: string, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      await apiAccount.deleteAccount(token!, accountId);
      
      return accountId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// fix this, to return error string
export const removeUserTeam = createAsyncThunk<any, any>('accounts/removeUserTeam', 
  async ({ accountId, userId }, thunkAPI): Promise<{ accountId?: string, userId?: string, error?: string }> => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      await apiAccount.removeUserTeam(token!, accountId, userId);
      
      return { accountId, userId };
    } catch (error: any) {
      console.error(thunkAPI.rejectWithValue(error.response.data.error));
      return {};
    }
  }
);

// fix this, to return error string
export const addUserTeam = createAsyncThunk<any, any>('accounts/addUserTeam', 
  async ({ accountId, userId }, thunkAPI): Promise<{ accountId?: string, userId?: string, user?: any, error?: string }> => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      await apiAccount.addUserTeam(token!, accountId, userId);
      let user = await apiUser.getUser(token!, userId);
      return { accountId, userId, user };
    } catch (error: any) {
      console.error(thunkAPI.rejectWithValue(error.response.data.error));
      return {};
    }
  }
);

export const selectAccounts = (state: RootState): IAccount[] => state.accounts.accounts;
export const selectAccountsLoading = (state: RootState): boolean => state.accounts.loading;
export const selectAccountsError = (state: RootState): string | null => state.accounts.error;
export const { setLoading, setAccounts, setError, setAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
