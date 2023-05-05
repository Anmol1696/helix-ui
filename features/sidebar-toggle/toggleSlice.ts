import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { HYDRATE } from "next-redux-wrapper";

export interface ToggleState {
  open: boolean;
}

const initialState: ToggleState = {
  open: true,
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.open,
      };
    },
  },
});

export const { toggle } = toggleSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToggle = (state: RootState) => state.toggle.open;

export default toggleSlice.reducer;
