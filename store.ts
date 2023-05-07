import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import toggleReducer from './features/sidebar-toggle/toggleSlice';
import treasuryDataReducer from './features/treasury-data/treasuryDataSlice';
import walletCryptoDataReducer from './features/wallet-data/walletDataSlice';
import buySellStateReducer from './features/wallet-data/buySellSlice'

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    treasuryData: treasuryDataReducer,
    walletCryptoData: walletCryptoDataReducer,
    buySellState: buySellStateReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk as ThunkMiddleware);
  },
}); 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
