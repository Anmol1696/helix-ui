import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface WalletCryptoData {
  selectedHelixFund: string;
  selectedToken: string;
  tokensInWallet: { [ticker: string]: number };
}

const initialState: WalletCryptoData = {
  selectedHelixFund: 'HTM',
  selectedToken: 'BTC',
  // TODO: Delete these hard-coded values once the backend is plumbed through
  tokensInWallet: {
    BTC: 1,
    ETH: 10,
    BNB: 100,
    AVAX: 1000,
    MATIC: 998,
    ATOM: 1500,
    OSMO: 15000,
    CRO: 50000,
    INJ: 2000,
    KAVA: 12000,
    DOT: 1750,
    FTM: 20000,
    HTM: 875,
    HDM: 235,
  },
};

const walletDataSlice = createSlice({
  name: 'walletCryptoData',
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    selectHelixFund: (state, action: PayloadAction<string>) => {
      state.selectedHelixFund = action.payload;
      if (!action.payload) {
        state.selectedToken = 'HTM';
      }
    },
    selectToken: (state, action: PayloadAction<string>) => {
      state.selectedToken = action.payload;
      if (!action.payload) {
        state.selectedToken = 'BTC';
      }
    },
    updateTokenQuantityInWallet: (
      state,
      action: PayloadAction<{ token: string; quantity: number }>) => {
      const { token, quantity } = action.payload;
      state.tokensInWallet[token] = quantity;
    },
  },
});

export const {
  selectHelixFund,
  selectToken,
  updateTokenQuantityInWallet
} = walletDataSlice.actions;

export default walletDataSlice.reducer;
