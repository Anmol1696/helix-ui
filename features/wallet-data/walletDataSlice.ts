import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface TokenData {
    ticker: string;
    targetWeight: number;
    price: number;
    currentWeight: number;
    buyFee: number;
    sellFee: number;
  }

interface ETFData {
    ticker: string;
    name: string;
    description: string;
    tokens: { [id: string]: TokenData };
    inWallet: number;
}

interface WalletCryptoData {
    selectedHelixFund: string;
    etfs: { [ticker: string]: ETFData };
    isLoading: boolean;
    error: string | null;
}

const initialState: WalletCryptoData = {
    selectedHelixFund: 'HTM',
    etfs: {
        HTM: {
            ticker: 'HTM',
            name: 'Helix Total Market',
            description: 'Helix Total Market (HTM) provides exposure to the entire cryptocurrency market.',
            tokens: {
            BTC: { ticker: 'BTC', targetWeight: 0.35, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            ETH: { ticker: 'ETH', targetWeight: 0.15, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            BNB: { ticker: 'BNB', targetWeight: 0.05, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            AVAX: { ticker: 'AVAX', targetWeight: 0.05, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            MATIC: { ticker: 'MATIC', targetWeight: 0.05, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            ATOM: { ticker: 'ATOM', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            OSMO: { ticker: 'OSMO', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            CRO: { ticker: 'CRO', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            INJ: { ticker: 'INJ', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            KAVA: { ticker: 'KAVA', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            DOT: { ticker: 'DOT', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            FTM: { ticker: 'FTM', targetWeight: 0.03, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            },
            inWallet: 0,
        },
        HDM: {
            ticker: 'HDM',
            name: 'Helix Degen Market',
            description: 'Helix Degen Market (HDM) provides exposure to the degen meme coin market.',
            tokens: {
            ATOM: { ticker: 'ATOM', targetWeight: 0.25, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            OSMO: { ticker: 'OSMO', targetWeight: 0.25, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            INJ: { ticker: 'INJ', targetWeight: 0.25, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },
            KAVA: { ticker: 'KAVA', targetWeight: 0.25, price: 0, currentWeight: 0, buyFee: 0, sellFee: 0 },  
            },
            inWallet: 0,
            },
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
      updateWalletTokenQuantity: (
        state,
        action: PayloadAction<{ etfTicker: string; quantity: number }>
      ) => {
        const { etfTicker, quantity } = action.payload;
        const etf = state.etfs[etfTicker];
        if (etf) {
          etf.inWallet = quantity;
        }
      },
    },
  });
  
  export const { selectHelixFund, updateTokenData, updateFeeData, updateWalletTokenQuantity } =
    walletDataSlice.actions;
  
  export default walletDataSlice.reducer;
