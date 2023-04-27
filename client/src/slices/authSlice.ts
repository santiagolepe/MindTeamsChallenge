import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../globals';
import { login, getProfile, logout } from '../services/auth';
import { RootState, AppThunk } from '../store';

interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const loginUser = (email: string, password: string): AppThunk => async (dispatch: any) => {
  try {
    const token = await login(email, password);
    dispatch(setToken(token));

    const profile = await getProfile(token);
    dispatch(setUser(profile));
  } catch (error) {
    throw error;
  }
};

export const logoutUser = (): AppThunk => async (dispatch: any, getState: any) => {
  const token = getState().auth.token;
  if (!token) return;

  try {
    await logout(token);
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    dispatch(setToken(null!));
    dispatch(setUser(null!));
  }
};

export const selectToken = (state: RootState): string | null => state.auth.token;
export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
