import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { ETFData as TreasuryETFData } from '../features/treasury-data/treasuryDataSlice';
import { ETFData as WalletETFData } from '../features/wallet-data/walletDataSlice';

interface ETFInfoProps {
  treasuryETFData: TreasuryETFData;
  walletETFData: WalletETFData;
}

const ETFInfo: React.FunctionComponent<ETFInfoProps> = ({ treasuryETFData, walletETFData }) => {
  const formatPrice = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const suffixes = ['', 'K', 'M', 'B', 'T'];

  const getSuffixIndex = (value: number) => {
    return Math.floor(Math.log10(value) / 3);
  }

  const formatMarketCap = (value: number) => {
    const suffixIndex = getSuffixIndex(value);
    let formattedValue = (value / Math.pow(1000, suffixIndex)).toFixed(1);
    return `$${formattedValue}${suffixes[getSuffixIndex(value)]}`;
  };

  const formatSupply = (value: number) => {
    const suffixIndex = getSuffixIndex(value);
    let formattedValue = (value / Math.pow(1000, suffixIndex)).toFixed(0);
    return `${formattedValue}${suffixes[suffixIndex]}`;
  };

  return (
    <>
        <Box mt={3} mb={2}>
            <Typography variant="body1">
            {walletETFData.description}
            </Typography>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <Card>
            <CardContent>
            <Typography variant="subtitle1" color="textSecondary" align="center">Price</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">{formatPrice(treasuryETFData.nav)}</Typography>
            </Box>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <Typography variant="subtitle1" color="textSecondary" align="center">Market Cap</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">{formatMarketCap(treasuryETFData.aum)}</Typography>
            </Box>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <Typography variant="subtitle1" color="textSecondary" align="center">Circulating Supply</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">{formatSupply(treasuryETFData.sharesOutstanding)}</Typography>
            </Box>
            </CardContent>
        </Card>
        <Card>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" align="center">Wallet Balance</Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">{formatSupply(walletETFData.inWallet)}</Typography>
          </Box>
        </CardContent>
      </Card>
        </div>
    </>
  );
};

export default ETFInfo;
