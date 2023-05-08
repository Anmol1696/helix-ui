
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const suffixes = ['', 'K', 'M', 'B', 'T'];

const getSuffixIndex = (value: number) => {
  return Math.floor(Math.log10(value) / 3);
};

const formatPrice = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

const formatMarketCap = (value: number) => {
  const suffixIndex = getSuffixIndex(value);
  let formattedValue = (value / Math.pow(1000, suffixIndex)).toFixed(1);
  return `$${formattedValue}${suffixes[getSuffixIndex(value)]}`;
};

const formatAmount = (value: number, decimals: number) => {
  const suffixIndex = getSuffixIndex(value);
  let formattedValue = (value / Math.pow(1000, suffixIndex)).toFixed(decimals);
  return `${formattedValue}${suffixes[suffixIndex]}`;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
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

export { formatMarketCap, formatAmount, formatPrice, formatCurrency, StripedDataGrid};
