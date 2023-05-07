import React, { useEffect } from "react";
import { alpha } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RootState } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';
import { selectToken } from '../features/wallet-data/walletDataSlice';
import Image from "next/image";

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

  const handleTokenSelect = (ticker: string) => {
    dispatch(selectToken(ticker));
  };

  const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);

  const getRowStyle = (token: string) => { 
    const isSelected = selectedETF?.tokens[token]?.selected;
    const selectedColor = alpha(buttonColor, 0.3);
    const backgroundColor = isSelected ? selectedColor : "inherit";
    const highlightColor = alpha(buttonHighlightColor, 0.1);
  
    return {
      "&:last-child td, &:last-child th": {
        border: 0,
      },
      backgroundColor,
      "&:hover, &.Mui-hovered": {
        backgroundColor: isSelected ? selectedColor : highlightColor,
        cursor: "pointer",
      },
      "&.Mui-selected": {
        backgroundColor: isSelected ? selectedColor : "inherit",
        color: isSelected ? "white" : "black",
      },
    };
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const iconCellStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

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
          <TableBody component="tbody">
            {rows.map((row) => (
              <TableRow
                key={row.token}
                sx={getRowStyle(row.token)}
                onClick={() => handleTokenSelect(row.token)}
              >
                <TableCell component="th" scope="row" sx={getRowStyle(row.token)}>
                  <div style={iconCellStyle} >
                    <Image src={`/${row.token.toLowerCase()}.svg`} alt={row.token} width={24} height={24} />
                    <span>{row.token}</span>
                  </div>
                </TableCell>
                <TableCell align="right" sx={getRowStyle(row.token)}>{row.currentWeight} </TableCell>
                <TableCell align="right" sx={getRowStyle(row.token)}>{row.targetWeight}</TableCell>
                <TableCell align="right" sx={getRowStyle(row.token)}>{row.fees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinSelector;
