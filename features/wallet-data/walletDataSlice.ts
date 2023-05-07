import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface TokenData {
  ticker: string;
  price: number;
  currentWeight: number;
  targetWeight: number;
  buyFee: number;
  sellFee: number;
  selected: boolean;
}

export interface ETFData {
  ticker: string;
  name: string;
  description: string;
  tokens: { [id: string]: TokenData };
  inWallet: number;
}

interface WalletCryptoData {
  selectedHelixFund: string;
  selectedToken: TokenData;
  etfs: { [ticker: string]: ETFData };
  isLoading: boolean;
  error: string | null;
  tokensInWallet: { [ticker: string]: number };
}

const initialState: WalletCryptoData = {
  selectedHelixFund: 'HTM',
  selectedToken: { ticker: 'BTC', targetWeight: 0.35, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0, selected: true },
  etfs: {
    HTM: {
      ticker: 'HTM',
      name: 'Helix Total Market',
      description: 'Helix Total Market (HTM) provides exposure to the entire cryptocurrency market.',
      tokens: {
        BTC: { ticker: 'BTC', targetWeight: 0.35, price: 0, currentWeight: 0.64, buyFee: 0, sellFee: 0, selected: true },
        ETH: { ticker: 'ETH', targetWeight: 0.15, price: 0, currentWeight: 0.26, buyFee: 0, sellFee: 0, selected: false },
        BNB: { ticker: 'BNB', targetWeight: 0.05, price: 0, currentWeight: 0.059, buyFee: 0, sellFee: 0, selected: false },
        AVAX: { ticker: 'AVAX', targetWeight: 0.05, price: 0, currentWeight: 0.01, buyFee: 0, sellFee: 0, selected: false },
        MATIC: { ticker: 'MATIC', targetWeight: 0.05, price: 0, currentWeight: 0.008, buyFee: 0, sellFee: 0, selected: false },
        ATOM: { ticker: 'ATOM', targetWeight: 0.03, price: 0, currentWeight: 0.0063, buyFee: 0, sellFee: 0, selected: false },
        OSMO: { ticker: 'OSMO', targetWeight: 0.03, price: 0, currentWeight: 0.0037, buyFee: 0, sellFee: 0, selected: false },
        CRO: { ticker: 'CRO', targetWeight: 0.03, price: 0, currentWeight: 0.002, buyFee: 0, sellFee: 0, selected: false },
        INJ: { ticker: 'INJ', targetWeight: 0.03, price: 0, currentWeight: 0.0013, buyFee: 0, sellFee: 0, selected: false },
        KAVA: { ticker: 'KAVA', targetWeight: 0.03, price: 0, currentWeight: 0.0007, buyFee: 0, sellFee: 0, selected: false },
        DOT: { ticker: 'DOT', targetWeight: 0.03, price: 0, currentWeight: 0.0005, buyFee: 0, sellFee: 0, selected: false },
        FTM: { ticker: 'FTM', targetWeight: 0.03, price: 0, currentWeight: 0.0004, buyFee: 0, sellFee: 0, selected: false },
      },
      inWallet: 0,
    },
    HDM: {
      ticker: 'HDM',
      name: 'Helix Degen Market',
      description: 'Helix Degen Market (HDM) provides exposure to the degen meme coin market.',
      tokens: {
        ATOM: { ticker: 'ATOM', targetWeight: 0.35, price: 0, currentWeight: 0.5, buyFee: 0, sellFee: 0, selected: false },
        OSMO: { ticker: 'OSMO', targetWeight: 0.3, price: 0, currentWeight: 0.27, buyFee: 0, sellFee: 0, selected: false },
        INJ: { ticker: 'INJ', targetWeight: 0.25, price: 0, currentWeight: 0.23, buyFee: 0, sellFee: 0, selected: false },
        KAVA: { ticker: 'KAVA', targetWeight: 0.2, price: 0, currentWeight: 0.1, buyFee: 0, sellFee: 0, selected: false },
      },
      inWallet: 0,
    },
  },
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
  },
  isLoading: false,
  error: null,
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
    },
    selectToken: (state, action: PayloadAction<string>) => {
      const { selectedHelixFund, etfs } = state;
      const selectedETF = etfs[selectedHelixFund];
      const selectedToken = selectedETF.tokens[action.payload];

      // Deselect the previously selected token
      const prevSelectedToken = Object.values(selectedETF.tokens).find((token) => token.selected);
      if (prevSelectedToken && selectedToken && prevSelectedToken != selectedToken) {
        prevSelectedToken.selected = false;
      }

      // Select the new token
      if (selectedToken) {
        selectedToken.selected = true;
        state.selectedToken = selectedToken;
        state.etfs[selectedHelixFund].tokens[selectedToken.ticker] = selectedToken;
      }
    },
    updateTokenData: (
      state,
      action: PayloadAction<{ etfTicker: string; ticker: string; data: Partial<TokenData> }>
    ) => {
      const { etfTicker, ticker, data } = action.payload;
      const etf = state.etfs[etfTicker];
      if (etf) {
        const token = Object.values(etf.tokens).find((t) => t.ticker === ticker);
        if (token) {
          Object.assign(token, data);
        }
      }
    },
    updateFeeData: (
      state,
      action: PayloadAction<{ etfTicker: string; ticker: string; buyFee: number; sellFee: number }>
    ) => {
      const { etfTicker, ticker, buyFee, sellFee } = action.payload;
      const etf = state.etfs[etfTicker];
      if (etf) {
        const token = Object.values(etf.tokens).find((t) => t.ticker === ticker);
        if (token) {
          token.buyFee = buyFee;
          token.sellFee = sellFee;
        }
      }
    },
    updateEtfQuantityInWallet: (
      state,
      action: PayloadAction<{ etfTicker: string; quantity: number }>
    ) => {
      const { etfTicker, quantity } = action.payload;
      const etf = state.etfs[etfTicker];
      if (etf) {
        etf.inWallet = quantity;
      }
      state.tokensInWallet[etfTicker] = quantity;
      state.etfs[etfTicker] = etf;
    },
    updateTokenQuantityInWallet: (
      state,
      action: PayloadAction<{ tokenTicker: string; quantity: number }>
    ) => {
      const { tokenTicker, quantity } = action.payload;
      state.tokensInWallet[tokenTicker] = quantity;
    },
  },
});

export const {
  selectHelixFund,
  selectToken,
  updateTokenData,
  updateFeeData,
  updateEtfQuantityInWallet,
} = walletDataSlice.actions;

export default walletDataSlice.reducer;
