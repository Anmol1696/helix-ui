import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, isLoading } = useAppSelector((state: RootState) => state.cryptoData);
  const totalMarketCap = Object.values(cryptoData).reduce((acc, { marketCap }) => acc + marketCap, 0);
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const calculateMarketCapWeight = (marketCap: number, totalMarketCap: number) => {
    return ((marketCap / totalMarketCap) * 100).toFixed(2);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="crypto table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {Object.entries(cryptoData).map(([id, data]) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.ticker}</TableCell>
                  <TableCell align="right">{formatNumber(data.price)}</TableCell>
                  <TableCell align="right">{formatNumber(data.marketCap)}</TableCell>
                  <TableCell align="right">{calculateMarketCapWeight(data.marketCap, totalMarketCap)}%</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
