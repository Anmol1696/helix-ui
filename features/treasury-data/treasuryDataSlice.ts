import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenData {
  count: number;
  currentWeight: number;
  targetWeight: number;
  buyFee: number;
  sellFee: number;
}

interface ETFData {
  nav: number;
  sharesOutstanding: number;
  tokens: { [ticker: string]: TokenData };
}

interface TreasuryDataState {
  ETFs: { [ticker: string] : ETFData };
}

const initialState: TreasuryDataState = {
  ETFs: {
    'HTM': {
        nav: 0,
        sharesOutstanding: 0,
        tokens: {
            
        },
    },
    'HDM': {
        nav: 0,
        sharesOutstanding: 0,
        tokens: {},
    },
  },
};

const calculateFee = (amount: number, feePercentage: number) => {
  return amount * (feePercentage / 100);
};

const treasuryDataSlice = createSlice({
  name: 'treasuryData',
  initialState,
  reducers: {
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
      const tokenData = ETF.tokens[tokenTicker];

      // Calculate the number of ETF tokens to be minted
      const tokensToMint = (amount * (1 - fee / 100)) / ETF.nav;

      // Update the ETF state
      ETF.sharesOutstanding += tokensToMint;
      tokenData.count += amount;
      // Recalculate fees based on weight
      const currentWeight = tokenData.count * tokenPrice;
      const weightDiff = Math.abs(currentWeight - tokenData.targetWeight);
      tokenData.buyFee = weightDiff > 0 ? weightDiff : 0;

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
      const tokenData = ETF.tokens[tokenTicker];

      // Calculate the number of tokens to be paid to the user
      const feeAmount = calculateFee(amount, fee);
      const tokensToPay = (amount - feeAmount) * ETF.nav;

      // Update the ETF state
      ETF.sharesOutstanding -= amount;
      tokenData.count -= tokensToPay;
      // Recalculate fees based on weight
      const currentWeight = tokenData.count * tokenPrice;
      const weightDiff = Math.abs(currentWeight - tokenData.targetWeight);
      tokenData.sellFee = weightDiff > 0 ? weightDiff : 0;

      // Update the state
      state.ETFs[ticker] = ETF;
    },
  },
});

export const { buyETF, sellETF } = treasuryDataSlice.actions;

export default treasuryDataSlice.reducer;
