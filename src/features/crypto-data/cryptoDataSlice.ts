import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TokenData {
    name: string;
    ticker: string;
    price: number;
    marketCap: number;
}

interface CryptoData {
    [id: string]: TokenData;
}

interface CryptoDataState {
    cryptoData: CryptoData;
    isLoading: boolean;
    error: string | null;
}

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

const BASE_URL = 'https://api.coingecko.com/api/v3/simple';
const ENDPOINT = 'price';
const VS_CURRENCIES = 'usd';
const INCLUDE_MARKET_CAP = true;

export const fetchCryptoData = createAsyncThunk('cryptoData/fetch', async () => {
    const cryptoIds = Object.keys(cryptoIdToTickerAndName);
    const url = `${BASE_URL}/${ENDPOINT}?ids=${cryptoIds.join(',')}&vs_currencies=${VS_CURRENCIES}&include_market_cap=${INCLUDE_MARKET_CAP}`;
    const response = await axios.get<{ [key: string]: { usd: number; usd_market_cap: number } }>(url);

    const cryptoData: CryptoData = {};
    console.log('test');
    Object.entries(response.data).forEach(([id, data]) => {
      cryptoData[id] = {
        name: cryptoIdToTickerAndName[id as keyof typeof cryptoIdToTickerAndName].name || '',
        ticker: cryptoIdToTickerAndName[id as keyof typeof cryptoIdToTickerAndName].ticker.toUpperCase() || '',
        price: data.usd,
        marketCap: data.usd_market_cap,
      };
      console.log('Market cap: %s', data.usd_market_cap);
    });
  
    return cryptoData;
  });
  
  const initialState: CryptoDataState = {
    cryptoData: {},
    isLoading: false,
    error: null,
  };
  
  const cryptoDataSlice = createSlice({
    name: 'cryptoData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchCryptoData.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<CryptoData>) => {
        state.cryptoData = action.payload;
        state.isLoading = false;
        state.error = null;
      });
      builder.addCase(fetchCryptoData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error fetching crypto data';
      });
    },
  });
  
  export default cryptoDataSlice.reducer;
