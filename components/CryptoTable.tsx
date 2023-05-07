import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { formatPrice, formatMarketCap, StripedDataGrid } from '../utils/utils';
import { 
  GridColDef,
  GridRowClassNameParams,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import Image from 'next/image';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const calculateMarketCapWeight = (marketCap: number, totalMarketCap: number) => {
  return +(marketCap / totalMarketCap * 100).toFixed(2);
};

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, isLoading, ETFs } = useAppSelector((state: RootState) => state.treasuryData);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  const totalMarketCap = Object.values(cryptoData).reduce((acc, { marketCap }) => acc + marketCap, 0);

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Image src={`/${params.row.ticker.toLowerCase()}.svg`} alt={params.row.ticker} width={24} height={24} />
      ),
      minWidth: 24,
      headerClassName: 'custom-header',
    },
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
        return formatPrice(params.value);
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
        return formatMarketCap(params.value);
      },
      flex: 1,
      minWidth: 175,
      headerClassName: 'custom-header',
    },
    {
      field: 'weight',
      headerName: 'Target Weight',
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
      icon: data.ticker.toLowerCase(),
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
