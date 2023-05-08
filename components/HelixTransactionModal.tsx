import { useEffect } from 'react';
import type { NextPage } from 'next'
import { RootState } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import CoinSelector from "./HelixTransactionCoinSelector";
import InputForm from "./HelixTransactionInputForm";
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { selectHelixFund } from "../features/wallet-data/walletDataSlice";

const HelixTransactionModal: NextPage = () => {
    const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);

    const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
    const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);
    const { selectedHelixFund } = useAppSelector(
      (state: RootState) => state.walletCryptoData
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchCryptoData());
    }, [dispatch]);
    const handleChange = (event: SelectChangeEvent) => {
      dispatch(selectHelixFund(event.target.value as string));
    };

    const { ETFs } = useAppSelector((state: RootState) => state.treasuryData);
    
    const helixFundMenuItems = Object.entries(ETFs).map(([ticker, ETF]) => (
      <MenuItem value={ticker} key={ticker}>
        {value === "buy" ? "Buy" : "Sell"} {ETF.name}
      </MenuItem>
    ));

    return (
      <>
        <FormControl fullWidth>
          <Select
            labelId="market-name"
            id="market-name"
            value={selectedHelixFund}
            label="Market"
            onChange={handleChange}
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: buttonColor,
              "&:hover": {
                background: buttonHighlightColor,
              },
            }}
          >
            {helixFundMenuItems}
          </Select>
          </FormControl>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CoinSelector />
          </Grid>
          <Grid item xs={6}>
            <InputForm />
          </Grid>
        </Grid>
      </>
    );
  };
    
export default HelixTransactionModal;
