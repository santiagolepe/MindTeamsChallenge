import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import alertSlice from './slices/alertSlice';
import accountsSlice from './slices/accountsSlice';
import transfersSlice from './slices/transfersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    alerts: alertSlice,
    accounts: accountsSlice,
    transfers: transfersSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
