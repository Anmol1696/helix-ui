import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { ETFData as TreasuryETFData } from '../features/treasury-data/treasuryDataSlice';
import { ETFData as WalletETFData } from '../features/wallet-data/walletDataSlice';
import { formatMarketCap, formatAmount, formatPrice } from '../utils/utils';

interface ETFInfoProps {
  treasuryETFData: TreasuryETFData;
  walletETFData: WalletETFData;
}

const ETFInfo: React.FunctionComponent<ETFInfoProps> = ({ treasuryETFData, walletETFData }) => {


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
                <Typography variant="h6">{formatAmount(treasuryETFData.sharesOutstanding)}</Typography>
            </Box>
            </CardContent>
        </Card>
        <Card>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" align="center">Wallet Balance</Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">{formatAmount(walletETFData.inWallet)}</Typography>
          </Box>
        </CardContent>
      </Card>
        </div>
    </>
  );
};

export default ETFInfo;
