import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RootState } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';
import { selectHelixFund } from "../features/wallet-data/walletDataSlice";

function createData(
  token: string,
  currentWeight: number,
  targetWeight: number,
  fees: number
) {
  return { token, currentWeight, targetWeight, fees };
}

const CoinSelector = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(selectHelixFund(event.target.value as string));
  };
  
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  
  const { value } = useAppSelector((state: RootState) => state.buySellState);
  const { etfs, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);
  const selectedETF = etfs[selectedHelixFund];
  
  const rows = Object.entries(selectedETF?.tokens || {}).map(([ticker, token]) =>
    createData(ticker, token.currentWeight, token.targetWeight, token.buyFee + token.sellFee)
  );

  const helixFundMenuItems = Object.entries(etfs).map(([ticker, etf]) => (
    <MenuItem value={ticker} key={ticker}>
      {etf.name}
    </MenuItem>
  ));

  return (
    <div>
      <Box
        sx={{
          minWidth: 120,
          backgroundColor: value === "buy" ? "#3e4ed9" : "#d93f4e",
        }}
      >
        <FormControl fullWidth>
          <Select
            labelId="market-name"
            id="market-name"
            value={selectedHelixFund}
            label="Market"
            onChange={handleChange}
            sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            {helixFundMenuItems}
          </Select>
        </FormControl>
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell align="right">Current Weight</TableCell>
              <TableCell align="right">Target Weight</TableCell>
              <TableCell align="right">Fees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.token}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.token}
                </TableCell>
                <TableCell align="right">{row.currentWeight}</TableCell>
                <TableCell align="right">{row.targetWeight}</TableCell>
                <TableCell align="right">{row.fees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinSelector;
