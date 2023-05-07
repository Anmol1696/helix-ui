import { createSlice } from "@reduxjs/toolkit";

export interface BuySellState {
  buySell: string;
  buttonColor: string,
  buttonHighlightColor: string,
}

const initialState: BuySellState = {
  buySell: "buy",
  buttonColor: "#3F51B5",
  buttonHighlightColor: "#1565c0",
};

export const buySellSlice = createSlice({
  name: "buySellState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    switchBuySell: (state, action) => {
      if (action.payload === "buy") {
        state.buySell = "buy";
        state.buttonColor = "#3F51B5";
        state.buttonHighlightColor = "#1565c0";
      } else {
        state.buySell = "sell";
        state.buttonColor = "#c62828";
        state.buttonHighlightColor = "#f5736b";
      }
    },
  },
});

export const { switchBuySell } = buySellSlice.actions;

export default buySellSlice.reducer;
