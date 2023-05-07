import type { NextPage } from 'next'
import { RootState } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import CoinSelector from "./HelixTransactionCoinSelector";
import InputForm from "./HelixTransactionInputForm";
import { selectHelixFund } from "../features/wallet-data/walletDataSlice";

const HelixTransactionModal: NextPage = () => {
    const { value } = useAppSelector((state: RootState) => state.buySellState);

    const { etfs, selectedHelixFund } = useAppSelector(
      (state: RootState) => state.walletCryptoData
    );

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
      dispatch(selectHelixFund(event.target.value as string));
    };
    
    const helixFundMenuItems = Object.entries(etfs).map(([ticker, etf]) => (
      <MenuItem value={ticker} key={ticker}>
        {value === "buy" ? "Buy" : "Sell"} {etf.name}
      </MenuItem>
    ));

    const theme = useTheme();

    return (
      <>
        <Box
          sx={{
            maxHeight: "60px",
            backgroundColor: value === "buy" ? "#3F51B5" : "#d32f2f",
            marginBottom: "0.2rem",
            "&:hover": {
              background: value === "buy" ? "#1565c0" : "#ef5350",
            },
          }}
        >
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
              }}
            >
              {helixFundMenuItems}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2} p={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
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
