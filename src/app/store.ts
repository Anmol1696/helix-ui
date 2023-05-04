import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import toggleReducer from '../features/sidebar-toggle/toggleSlice';
import cryptoDataReducer from '../features/crypto-data/cryptoDataSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    cryptoData: cryptoDataReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk as ThunkMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
