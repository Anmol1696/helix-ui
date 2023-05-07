import React, { useEffect } from "react";
import Image from "next/image";
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

function createData(
  token: string,
  inWallet: number,
  weight: number,
  fees: number
) {
  return { token, inWallet, weight, fees };
}

const CoinSelector = () => {
  const dispatch = useAppDispatch();
  const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);
  const { etfs, selectedHelixFund, selectedToken, tokensInWallet } = useAppSelector((state: RootState) => state.walletCryptoData);
  const selectedETF = etfs[selectedHelixFund];
  useEffect(() => {
    dispatch(fetchCryptoData());
    dispatch(selectToken(selectedToken.ticker))
  }, [dispatch]);
  
  const rows = Object.entries(selectedETF?.tokens || {}).map(([ticker, token]) =>
    createData(ticker, tokensInWallet[ticker], token.targetWeight, value === "buy" ? token.buyFee : token.sellFee)
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
    backgroundColor: '#f7f7f7',
  };

  const headerItemStyle = {
    fontWeight: '500',
    fontSize: '0.9rem',
  }

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
            <TableRow style={headerStyle}>
              <TableCell style={headerItemStyle}>Token</TableCell>
              <TableCell style={headerItemStyle} align="right"># in wallet</TableCell>
              <TableCell style={headerItemStyle} align="right">Weight</TableCell>
              <TableCell style={headerItemStyle} align="right">Fees</TableCell>
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
                <TableCell align="right" sx={getRowStyle(row.token)}>{row.inWallet} </TableCell>
                <TableCell align="right" sx={getRowStyle(row.token)}>{row.weight}</TableCell>
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
