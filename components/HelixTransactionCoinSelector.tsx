import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RootState } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';

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

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  
  const { etfs, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);
  const selectedETF = etfs[selectedHelixFund];
  
  const rows = Object.entries(selectedETF?.tokens || {}).map(([ticker, token]) =>
    createData(ticker, token.currentWeight, token.targetWeight, token.buyFee + token.sellFee)
  );

  return (
    <div>
      <TableContainer 
        sx={{ maxHeight: "100%"}}
        >
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
