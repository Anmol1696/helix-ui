import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { formatMarketCap, formatAmount, formatPrice } from '../utils/utils';

const ETFInfo = () => {
    const dispatch = useAppDispatch();
    const { selectedHelixFund, tokensInWallet } = useAppSelector((state: RootState) => state.walletCryptoData);
    useEffect(() => {
      dispatch(fetchCryptoData());
    }, [dispatch]);

    const { ETFs } = useAppSelector((state: RootState) => state.treasuryData);
    const selectedETF = ETFs[selectedHelixFund];
    return (
        <>
            <Box mt={3} mb={2}>
                <Typography variant="body1">
                {selectedETF.description}
                </Typography>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <Card>
                <CardContent>
                <Typography variant="subtitle1" color="textSecondary" align="center">Price</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6">{formatPrice(selectedETF.nav)}</Typography>
                </Box>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <Typography variant="subtitle1" color="textSecondary" align="center">Market Cap</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6">{formatMarketCap(selectedETF.aum)}</Typography>
                </Box>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <Typography variant="subtitle1" color="textSecondary" align="center">Circulating Supply</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6">{formatAmount(selectedETF.sharesOutstanding)}</Typography>
                </Box>
                </CardContent>
            </Card>
            <Card>
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary" align="center">Wallet Balance</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">{formatAmount(tokensInWallet[selectedHelixFund])}</Typography>
                </Box>
            </CardContent>
            </Card>
            </div>
        </>
);
};

export default ETFInfo;
