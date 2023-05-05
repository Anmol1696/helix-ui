import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';
import { DataGrid, GridColDef, GridValueGetterParams, GridValueFormatterParams} from '@mui/x-data-grid';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const calculateMarketCapWeight = (marketCap: number, totalMarketCap: number) => {
  return +(marketCap / totalMarketCap * 100).toFixed(2);
};

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, isLoading } = useAppSelector((state: RootState) => state.cryptoData);
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  const totalMarketCap = Object.values(cryptoData).reduce((acc, { marketCap }) => acc + marketCap, 0);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'ticker', headerName: 'Ticker', flex: 1, minWidth: 100 },
    { 
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) =>  {
        if (params.value == null) {
          return ''
        }
        return formatCurrency(params.value);
      },
      minWidth: 125,
    },
    {
      field: 'marketCap',
      headerName: 'Market Cap',
      type: 'number',
      valueFormatter: (params: GridValueFormatterParams<number>) =>  {
        if (params.value == null) {
          return ''
        }
        return formatCurrency(params.value);
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
      minWidth: 100,
      valueFormatter: ({ value }) => `${value}%`,
    },
  ];

  const rows = Object.entries(cryptoData)
  .map(([id, data]) => ({
    id,
    name: data.name,
    ticker: data.ticker,
    price: data.price,
    weight: calculateMarketCapWeight(data.marketCap, totalMarketCap),
    marketCap: data.marketCap,
  }))
  .sort((a, b) => b.marketCap - a.marketCap);

  return (
    <div style={{ height: 'auto', width: 'auto' }}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};
export default CryptoTable;
