import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store';

export interface BuySellState {
  value: string;
}

const initialState: BuySellState = {
  value: "buy",
};

export const buySellSlice = createSlice({
  name: "buySellState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    switchBuySell: (state, action) => {
      if (action.payload === "buy") {
        state.value = "buy";
      } else {
        state.value = "sell";
      }
    },
  },
});

export const { switchBuySell } = buySellSlice.actions;

export default buySellSlice.reducer;
