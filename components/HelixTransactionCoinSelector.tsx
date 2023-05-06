import React, { useState } from "react";
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
import {useAppSelector, useAppDispatch} from '../hooks';
import {selectHelixFund} from "../features/wallet-data/walletDataSlice";

function createData(
  token: string,
  currentWeight: number,
  targetWeight: number,
  fees: number
) {
  return { token, currentWeight, targetWeight, fees };
}

// @Maaj please refactor this to take real data from a slice
const rows = [
  createData("BTC", 0.447, 0.44, 0.025),
  createData("ETH", 0.212, 0.215, 0.1),
  createData("ATOM", 0.212, 0.215, 0.2),
  createData("BNB", 0.212, 0.215, 0.0),
  createData("OSMO", 0.212, 0.215, 0.5),
  createData("MATIC", 0.212, 0.215, 0.3),
  createData("AVAX", 0.212, 0.215, 0.2),
];

const CoinSelector = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(selectHelixFund(event.target.value as string));
  };

   const { value } = useAppSelector((state: RootState) => state.buySellState);
   const { walletData, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);


   const helixFundMenuItems = Object.entries(walletData).map((id, data) => {
        const walletData = id[1];
        return (
            <MenuItem value={walletData.ticker} key={walletData.ticker}>
                 {walletData.displayName}
            </MenuItem>
        )
    });

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
