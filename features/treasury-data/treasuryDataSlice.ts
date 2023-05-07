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

const tickerToCryptoId = new Map([
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
  count: number;
  currentWeight: number;
  targetWeight: number;
  buyFee: number;
  sellFee: number;
}

export interface ETFData {
  aum: number;
  nav: number;
  sharesOutstanding: number;
  holdings: { [ticker: string]: ETFHoldingData };
}

interface TreasuryData {
  cryptoData: CryptoData;
  isLoading: boolean;
  error: string | null;
  ETFs: { [ticker: string] : ETFData };
}

const initialState: TreasuryData = {
  cryptoData: {},
  isLoading: false,
  error: null,
  ETFs: {
    'HTM': {
        aum: 1000000,
        nav: 2,
        sharesOutstanding: 500000,
        holdings: {
          BTC: { count: 12.13, targetWeight: 0.35, currentWeight: 0.64, buyFee: 0, sellFee: 0, },
          ETH: { count: 78.79, targetWeight: 0.15, currentWeight: 0.26, buyFee: 0, sellFee: 0, },
          BNB: { count: 154.36, targetWeight: 0.05, currentWeight: 0.059, buyFee: 0, sellFee: 0, },
          AVAX: { count: 51020.41, targetWeight: 0.05, currentWeight: 0.01, buyFee: 0, sellFee: 0, },
          MATIC: { count: 8865.25, targetWeight: 0.05, currentWeight: 0.008, buyFee: 0, sellFee: 0, },
          ATOM: { count: 1809.41, targetWeight: 0.03, currentWeight: 0.0063, buyFee: 0, sellFee: 0, },
          OSMO: { count: 2767.53, targetWeight: 0.03, currentWeight: 0.0037, buyFee: 0, sellFee: 0, },
          CRO: { count: 428571.43, targetWeight: 0.03, currentWeight: 0.002, buyFee: 0, sellFee: 0, },
          INJ: { count: 73170.73, targetWeight: 0.03, currentWeight: 0.0013, buyFee: 0, sellFee: 0, },
          KAVA: { count: 4155.12, targetWeight: 0.03, currentWeight: 0.0007, buyFee: 0, sellFee: 0, },
          DOT: { count: 42857.14, targetWeight: 0.03, currentWeight: 0.0005, buyFee: 0, sellFee: 0, },
          FTM: { count: 41095.89, targetWeight: 0.03, currentWeight: 0.0004, buyFee: 0, sellFee: 0, },
        },
    },
    'HDM': {
        aum: 100000,
        nav: 0.1,
        sharesOutstanding: 1000000,
        holdings: {
          ATOM: { targetWeight: 0.35, count: 4612.55, currentWeight: 0.5, buyFee: 0, sellFee: 0, },
          OSMO: { targetWeight: 0.3, count: 38571.43, currentWeight: 0.27, buyFee: 0, sellFee: 0, },
          INJ: { targetWeight: 0.25, count: 3185.60, currentWeight: 0.23, buyFee: 0, sellFee: 0, },
          KAVA: { targetWeight: 0.2, count: 13698.63, currentWeight: 0.1, buyFee: 0, sellFee: 0, },
        },
    },
  },
};

const calculateFee = (amount: number, feePercentage: number) => {
  return amount * (feePercentage / 100);
};

const updateETFState = (ETF: ETFData, tokenTicker: string, amount: number, tokenPrice: number, transactionValue: number, fees: number) => {
  const tokenData = ETF.holdings[tokenTicker];

  // Update the ETF state
  ETF.sharesOutstanding += amount;
  tokenData.count += transactionValue / tokenPrice;

  // Update AUM and NAV
  ETF.aum += transactionValue - fees;
  ETF.nav = ETF.aum / ETF.sharesOutstanding;

  // Calculate resultant weight
  const resultantWeight = (tokenData.count * tokenPrice) / ETF.aum;

  // Calculate weight difference and fee direction
  const weightDiff = Math.abs(resultantWeight - tokenData.targetWeight);
  const feeDirection = resultantWeight > tokenData.targetWeight ? 1 : -1;

  // Update buyFee and sellFee
  tokenData.buyFee -= feeDirection * weightDiff;
  tokenData.sellFee += feeDirection * weightDiff;

  // Update current weight
  tokenData.currentWeight = resultantWeight;
  ETF.holdings[tokenTicker] = tokenData;
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
      const { ticker, tokenTicker, amount, tokenPrice, fee } = action.payload;
      const ETF = state.ETFs[ticker];
    
      // Calculate the USD value of the buy transaction
      const transactionValue = amount * tokenPrice;
    
      // Calculate the fees
      const fees = calculateFee(transactionValue, fee);
    
      // Update ETF state
      updateETFState(ETF, tokenTicker, amount, tokenPrice, transactionValue, fees);
    
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
    
      // Calculate the USD value of the sell transaction
      const transactionValue = amount * ETF.nav;
    
      // Calculate the fees
      const fees = calculateFee(transactionValue, fee);
    
      // Update ETF state
      updateETFState(ETF, tokenTicker, -amount, tokenPrice, transactionValue, fees);
    
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
          const tokenData = holdings[tokenTicker];
          const tokenPrice = tokenId ? cryptoData[tokenId]?.price || 0 : 0;
          const tokenCount = tokenData.count;
          aum += tokenPrice * tokenCount;
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
