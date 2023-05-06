import type { NextPage } from 'next'
import { RootState } from '../store';
import { useAppSelector } from  '../hooks';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CoinSelector from "./HelixTransactionCoinSelector";
import InputForm from "./HelixTransactionInputForm";

const HelixTransactionModal: NextPage = () => {
    const { value } = useAppSelector((state: RootState) => state.buySellState);

    const { etfs, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);
    const selecdHelixFundData = etfs[selectedHelixFund];

    return (
       <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{value === "buy" ? "Buy" : "Sell"} {selecdHelixFundData.name}</h1>
      </Box>
      <Grid container spacing={6} p={3}>
        <Grid item xs={6}>
          <CoinSelector />
        </Grid>
        <Grid item xs={6}>
          <InputForm />
        </Grid>
      </Grid>
    </div>
    );    
};
    
export default HelixTransactionModal;



