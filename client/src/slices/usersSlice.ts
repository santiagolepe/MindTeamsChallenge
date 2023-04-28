import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import apiUser from '../services/users';
import { selectToken } from './authSlice';
import { IUser } from '../globals';

interface UsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.users = [action.payload, ...state.users];
    },
    deleteUserReducer: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user._id === updatedUser._id);
      if (index !== -1) state.users[index] = updatedUser;
    });
  },
});

export const { setLoading, setUsers, setError, setUser } = usersSlice.actions;

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const token = getState().auth.token;

  try {
    const users = await apiUser.fetchAllUsers(token!);
    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setError('Error fetching users.'));
  } finally {
    dispatch(setLoading(false));
  }
};


export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: any, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      let newUser = await apiUser.createUser(token!, user);
      
      return newUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: any, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      let updatedUser = await apiUser.updateUser(token!, user);
      
      return updatedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, thunkAPI) => {
    try {
      const token = selectToken(thunkAPI.getState() as RootState);
      await apiUser.deleteUser(token!, userId);
      
      return userId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const selectUsers = (state: RootState): any[] => state.users.users;
export const selectUsersLoading = (state: RootState): boolean => state.users.loading;
export const selectUsersError = (state: RootState): string | null => state.users.error;

export default usersSlice.reducer;
