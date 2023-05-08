import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HYDRATE } from "next-redux-wrapper";
import axios from 'axios';

const cryptoIdToTickerAndName = {
  'bitcoin': { ticker: 'BTC', name: 'Bitcoin' },
  'ethereum': { ticker: 'ETH', name: 'Ethereum' },
  'binancecoin': { ticker: 'BNB', name: 'Binance Coin' },
  'avalanche-2': { ticker: 'AVAX', name: 'Avalanche' },
  'matic-network': { ticker: 'MATIC', name: 'Polygon' },
  'cosmos': { ticker: 'ATOM', name: 'Cosmos' },
  'osmosis': { ticker: 'OSMO', name: 'Osmosis' },
  'crypto-com-chain': { ticker: 'CRO', name: 'Cronos' },
  'injective-protocol': { ticker: 'INJ', name: 'Injective' },
  'kava': { ticker: 'KAVA', name: 'Kava' },
  'polkadot': { ticker: 'DOT', name: 'Polkadot' },
  'fantom': { ticker: 'FTM', name: 'Fantom' },
};

export const tickerToCryptoId = new Map([
  ['BTC', 'bitcoin'],
  ['ETH', 'ethereum'],
  ['BNB', 'binancecoin'],
  ['AVAX', 'avalanche-2'],
  ['MATIC', 'matic-network'],
  ['ATOM', 'cosmos'],
  ['OSMO', 'osmosis'],
  ['CRO', 'crypto-com-chain'],
  ['INJ', 'injective-protocol'],
  ['KAVA', 'kava'],
  ['DOT', 'polkadot'],
  ['FTM', 'fantom'],
]);

const BASE_URL = 'https://api.coingecko.com/api/v3/simple';
const ENDPOINT = 'price';
const VS_CURRENCIES = 'usd';
const INCLUDE_MARKET_CAP = true;

export const fetchCryptoData = createAsyncThunk('cryptoData/fetch', async () => {
  const cryptoIds = Object.keys(cryptoIdToTickerAndName);
  const url = `${BASE_URL}/${ENDPOINT}?ids=${cryptoIds.join(',')}&vs_currencies=${VS_CURRENCIES}&include_market_cap=${INCLUDE_MARKET_CAP}`;
  const response = await axios.get<{ [key: string]: { usd: number; usd_market_cap: number } }>(url);

  const cryptoData: CryptoData = {};
  Object.entries(response.data).forEach(([id, data]) => {
    cryptoData[id] = {
      name: cryptoIdToTickerAndName[id as keyof typeof cryptoIdToTickerAndName].name || '',
      ticker: cryptoIdToTickerAndName[id as keyof typeof cryptoIdToTickerAndName].ticker.toUpperCase() || '',
      price: data.usd,
      marketCap: data.usd_market_cap,
    };
  });

  return cryptoData;
});

export interface TokenData {
  name: string;
  ticker: string;
  price: number;
  marketCap: number;
}

interface CryptoData {
  [id: string]: TokenData;
}

interface ETFHoldingData {
  tokenData: TokenData | null;
  countInTreasury: number;
  currentWeight: number;
  targetWeight: number;
  buyFee: number;
  sellFee: number;
}

export interface ETFData {
  ticker: string;
  name: string;
  aum: number;
  nav: number;
  description: string;
  sharesOutstanding: number;
  holdings: { [ticker: string]: ETFHoldingData };
}

interface TreasuryData {
  cryptoData: CryptoData;
  isLoading: boolean;
  error: string | null;
  ETFs: { [ticker: string] : ETFData };
  revenues: number;
  revenueTokens: {[ticker: string] : number };
}

const initialState: TreasuryData = {
  cryptoData: {},
  isLoading: false,
  error: null,
  ETFs: {
    'HTM': {
        ticker: 'HTM',
        name: 'Helix Total Market',
        description: 'Helix Total Market (HTM) provides exposure to the entire cryptocurrency market.',
        aum: 1000000,
        nav: 2,
        sharesOutstanding: 500000,
        holdings: {
          BTC: { tokenData: null, countInTreasury: 12.13, targetWeight: 0.35, currentWeight: 0.64, buyFee: 0.05, sellFee: 0, },
          ETH: { tokenData: null, countInTreasury: 78.79, targetWeight: 0.15, currentWeight: 0.26, buyFee: 0.03, sellFee: 0, },
          BNB: { tokenData: null, countInTreasury: 154.36, targetWeight: 0.05, currentWeight: 0.059, buyFee: 0.003, sellFee: 0, },
          AVAX: { tokenData: null, countInTreasury: 51020.41, targetWeight: 0.05, currentWeight: 0.01, buyFee: 0, sellFee: 0.025, },
          MATIC: { tokenData: null, countInTreasury: 8865.25, targetWeight: 0.05, currentWeight: 0.008, buyFee: 0, sellFee: 0.0275, },
          ATOM: { tokenData: null, countInTreasury: 1809.41, targetWeight: 0.03, currentWeight: 0.0063, buyFee: 0, sellFee: 0.03, },
          OSMO: { tokenData: null, countInTreasury: 2767.53, targetWeight: 0.03, currentWeight: 0.0037, buyFee: 0, sellFee: 0.0325, },
          CRO: { tokenData: null, countInTreasury: 428571.43, targetWeight: 0.03, currentWeight: 0.002, buyFee: 0, sellFee: 0.035, },
          INJ: { tokenData: null, countInTreasury: 73170.73, targetWeight: 0.03, currentWeight: 0.0013, buyFee: 0, sellFee: 0.0375, },
          KAVA: { tokenData: null, countInTreasury: 4155.12, targetWeight: 0.03, currentWeight: 0.0007, buyFee: 0, sellFee: 0.04, },
          DOT: { tokenData: null, countInTreasury: 42857.14, targetWeight: 0.03, currentWeight: 0.0005, buyFee: 0, sellFee: 0.0425, },
          FTM: { tokenData: null, countInTreasury: 41095.89, targetWeight: 0.03, currentWeight: 0.0004, buyFee: 0, sellFee: 0.043, },
        },
    },
    'HDM': {
        ticker: 'HDM',
        name: 'Helix Degen Market',
        description: 'Helix Degen Market (HDM) provides exposure to the degen meme coin market.',
        aum: 100000,
        nav: 0.1,
        sharesOutstanding: 1000000,
        holdings: {
          ATOM: { tokenData: null, targetWeight: 0.35, countInTreasury: 4612.55, currentWeight: 0.5, buyFee: 0.025, sellFee: 0, },
          OSMO: { tokenData: null, targetWeight: 0.3, countInTreasury: 38571.43, currentWeight: 0.27, buyFee: 0, sellFee: 0.01, },
          INJ: { tokenData: null, targetWeight: 0.25, countInTreasury: 3185.60, currentWeight: 0.23, buyFee: 0, sellFee: 0.008, },
          KAVA: { tokenData: null, targetWeight: 0.2, countInTreasury: 13698.63, currentWeight: 0.1, buyFee: 0, sellFee: 0.025, },
        },
    },
  },
  revenues: 0,
  revenueTokens: {
    BTC: 0,
    ETH: 0,
    BNB: 0,
    AVAX: 0,
    MATIC: 0,
    ATOM: 0,
    OSMO: 0,
    CRO: 0,
    INJ: 0,
    KAVA: 0,
    DOT: 0,
    FTM: 0,
    HTM: 0,
    HDM: 0,
  },
};

export const calculateFee = (amount: number, feePercentage: number) => {
  return amount * (feePercentage / 100);
};

const treasuryDataSlice = createSlice({
  name: 'treasuryData',
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    buyETF: (
      state,
      action: PayloadAction<{
        ticker: string;
        tokenTicker: string;
        amount: number;
        tokenPrice: number;
        fee: number;
      }>
    ) => {
      const { ticker, tokenTicker, amount, tokenPrice, fee} = action.payload;
      const ETF = state.ETFs[ticker];
      const holdingData = ETF.holdings[tokenTicker];
    
      // Calculate the USD value of the buy transaction
      const transactionValue = amount * tokenPrice;

      // Calculate the number of tokens to receive to add to AUM & revenues
      const tokensToReceive = (amount + fee) / tokenPrice;
      const tokensToAddToTreasury = amount / tokenPrice;
      const tokensAsRevenue = tokensToReceive - tokensToAddToTreasury;

      ETF.sharesOutstanding += amount;
      ETF.aum += transactionValue;
      ETF.nav = ETF.aum / ETF.sharesOutstanding;

      holdingData.countInTreasury += tokensToAddToTreasury;
      
      // The purchase will cascade token weight and fee changes, so update them all now.
      for ( const tickerToUpdate in ETF.holdings) {
        const tokenData = ETF.holdings[tickerToUpdate];
        const tokenId = tickerToCryptoId.get(tickerToUpdate);
        if (tokenId) {
          const currPrice = state.cryptoData[tokenId].price;
          const newWeight = tokenData.countInTreasury * currPrice / ETF.aum;
          tokenData.currentWeight = newWeight;
          const targetWeight = tokenData.targetWeight;
          const weightDiff = Math.abs(targetWeight - newWeight);
          if (newWeight > targetWeight) {
            tokenData.buyFee = weightDiff / 5;
          } else {
            tokenData.sellFee = weightDiff / 5;
          }
        }
      }
      
      state.revenues += fee;
      state.revenueTokens[tokenTicker] = tokensAsRevenue;
      
      // Update the state
      state.ETFs[ticker] = ETF;
    },
    sellETF: (
      state,
      action: PayloadAction<{
        ticker: string;
        tokenTicker: string;
        amount: number;
        tokenPrice: number;
        fee: number;
      }>
    ) => {
      const { ticker, tokenTicker, amount, tokenPrice, fee } = action.payload;
      const ETF = state.ETFs[ticker];
      const holdingData = ETF.holdings[tokenTicker];
    
      // Calculate the USD value of the sell transaction
      const transactionValue = amount * ETF.nav;

      // Change to AUM
      const adjustedValue = transactionValue - fee;

      // Calculate the number of tokens remove from AUM & add to revenues
      const tokensToRemoveFromTreasury = adjustedValue / tokenPrice;
      const ETFTokensToBurn = adjustedValue / ETF.nav;
      const ETFTokensAsRevenue = fee / ETF.nav;

      ETF.sharesOutstanding -= ETFTokensToBurn;
      ETF.aum -= adjustedValue;
      ETF.nav = ETF.aum / ETF.sharesOutstanding;

      holdingData.countInTreasury -= tokensToRemoveFromTreasury;

      // The purchase will cascade token weight and fee changes, so update them all now.
      for ( const tickerToUpdate in ETF.holdings) {
        const tokenData = ETF.holdings[tickerToUpdate];
        const tokenId = tickerToCryptoId.get(tickerToUpdate);
        if (tokenId) {
          const currPrice = state.cryptoData[tokenId].price;
          const newWeight = tokenData.countInTreasury * currPrice / ETF.aum;
          tokenData.currentWeight = newWeight;
          const targetWeight = tokenData.targetWeight;
          const weightDiff = Math.abs(targetWeight - newWeight);
          if (newWeight > targetWeight) {
            tokenData.buyFee = weightDiff / 5;
          } else {
            tokenData.sellFee = weightDiff / 5;
          }
        }
      }
    
      state.revenues += fee;
      state.revenueTokens[ticker] = ETFTokensAsRevenue;
    
      // Update the state
      state.ETFs[ticker] = ETF;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<CryptoData>) => {
      state.cryptoData = action.payload;
      state.isLoading = false;
      state.error = null;
      // Calculate NAV and AUM for each ETF
      const { cryptoData, ETFs } = state;
      for (const ticker in ETFs) {
        const ETF = ETFs[ticker];
        const holdings = ETF.holdings;
        let aum = 0;
        for (const tokenTicker in holdings) {
          const tokenId = tickerToCryptoId.get(tokenTicker);
          const holdingData = holdings[tokenTicker];
          const tokenPrice = tokenId ? cryptoData[tokenId]?.price || 0 : 0;
          const tokenCount = holdingData.countInTreasury;
          aum += tokenPrice * tokenCount;
          if (tokenId) {
            holdings[tokenTicker].tokenData = cryptoData[tokenId]
          }
        }
        ETF.nav = aum / ETF.sharesOutstanding;
        ETF.aum = aum;
        state.ETFs[ticker] = ETF;
      }
    });
    builder.addCase(fetchCryptoData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Error fetching crypto data';
    });
  },
});

export const { buyETF, sellETF } = treasuryDataSlice.actions;

export default treasuryDataSlice.reducer;
