import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import alertSlice from './slices/alertSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    alerts: alertSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
