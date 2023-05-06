import {createSlice} from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

interface WalletData {
    displayName: string;
    ticker: string;
    price: number;
    sevenDayGrowth: number;
    inWallet: number;
    balanceInUSD: number;
    description: string;
}

interface WalletCryptoData {
    [id: string]: WalletData;
}

interface WalletCryptoState {
    walletData: WalletCryptoData;
    selectedHelixFund: string;
    isLoading: boolean;
    error: string | null;
}


const initialState: WalletCryptoState = {
    walletData: {
        'HTM': {
            displayName: 'Helix Total Market (HTM)',
            ticker: 'HTM',
            price: 1.07,
            sevenDayGrowth: 1.7,
            inWallet: 932.71,
            balanceInUSD: 998,
            description: 'Helix Total Market (HTM) provides exposure to the entire cryptocurrency market.'
        },
        'HDM': {
            displayName: 'Helix Degen Market (HDM)',
            ticker: 'HDM',
            price: -26.8,
            sevenDayGrowth: -1.7,
            inWallet: 1,
            balanceInUSD: -26.8,
            description: 'Helix Degen Market (HDM) provides exposure to the degen meme coin market.'
        }
    },
    selectedHelixFund: 'HTM',
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
    selectHelixFund: (state, action) => {
        state.selectedHelixFund = action.payload;
    }
},

});

export const {selectHelixFund} = walletDataSlice.actions;

export default walletDataSlice.reducer;
