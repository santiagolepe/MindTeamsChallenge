import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertProps } from '../globals';

interface AlertState {
  alerts: IAlertProps[];
}

const initialState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlertProps>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.alerts.splice(action.payload, 1);
    },
  },
});

export const { showAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
