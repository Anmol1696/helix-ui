import React, { useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { fetchCryptoData } from '../features/crypto-data/cryptoDataSlice';
import { DataGrid, gridClasses, GridColDef, GridRowClassNameParams, GridValueFormatterParams} from '@mui/x-data-grid';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const calculateMarketCapWeight = (marketCap: number, totalMarketCap: number) => {
  return +(marketCap / totalMarketCap * 100).toFixed(2);
};

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${gridClasses.row}`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, isLoading } = useAppSelector((state: RootState) => state.cryptoData);
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  const totalMarketCap = Object.values(cryptoData).reduce((acc, { marketCap }) => acc + marketCap, 0);

  const columns: GridColDef[] = [
    { 
      field: 'name',
      headerName: 'Name',
      align:'left',
      headerAlign: 'left',
      flex: 1,
      minWidth: 100,
      headerClassName: 'custom-header',
    },
    { 
      field: 'ticker',
      headerName: 'Ticker',
      align:'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 75,
      headerClassName: 'custom-header',
    },
    { 
      field: 'price',
      headerName: 'Price',
      type: 'number',
      align:'right',
      headerAlign: 'right',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) =>  {
        if (params.value == null) {
          return ''
        }
        return formatCurrency(params.value);
      },
      minWidth: 100,
      headerClassName: 'custom-header',
    },
    {
      field: 'marketCap',
      headerName: 'Market Cap',
      type: 'number',
      align:'right',
      headerAlign: 'right',
      valueFormatter: (params: GridValueFormatterParams<number>) =>  {
        if (params.value == null) {
          return ''
        }
        return formatCurrency(params.value);
      },
      flex: 1,
      minWidth: 175,
      headerClassName: 'custom-header',
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
      align:'right',
      headerAlign: 'right',
      minWidth: 75,
      valueFormatter: ({ value }) => {
        if (typeof value !== 'number') {
          return '';
        }
        const formattedValue = value.toFixed(2); // 2 digits past the decimal. Preserves alignment
        return `${formattedValue}%`;
      },
      headerClassName: 'custom-header',
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

  const getRowClassName = (params: GridRowClassNameParams) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
  };

  return (
    <div style={{ height: 'auto', width: 'auto' }}>
      <StripedDataGrid
        autoHeight
        columns={columns}
        rows={rows}
        loading={isLoading}
        getRowClassName={getRowClassName}
        components={{
          Toolbar: () => null,
        }}
        sx={{
          boxShadow: 2,
          '& .custom-header': {
            fontWeight: 'bolder',
            fontSize: '1.1rem',
            backgroundColor: '#f7f7f7',
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </div>
  );
};
export default CryptoTable;
