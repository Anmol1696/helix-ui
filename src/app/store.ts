import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from '../features/sidebar-toggle/toggleSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
