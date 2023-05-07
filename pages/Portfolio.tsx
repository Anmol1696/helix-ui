import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Head from 'next/head';
import { RootState } from '../store';
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { formatCurrency, formatAmount } from '../utils/utils';
import { Typography, Card, CardContent, Grid } from '@mui/material';

const Portfolio = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const { etfs, tokensInWallet } = useAppSelector(
    (state: RootState) => state.walletCryptoData
  );
  const { ETFs } = useAppSelector((state: RootState) => state.treasuryData);

  // Calculate total portfolio value
  const portfolioValue = Object.entries(etfs)
    .flatMap(([ticker, etf]) => {
      return Object.entries(etf.tokens).reduce((etfValue, [tokenTicker, token]) => {
        const quantity = tokensInWallet[tokenTicker] || 0;
        const tokenValue = token.price * quantity;
        return etfValue + tokenValue;
      }, 0);
    })
    .reduce((totalValue, etfValue) => totalValue + etfValue, 0);

  const htmTokensHeld = tokensInWallet.HTM || 0;
  const hdmTokensHeld = tokensInWallet.HDM || 0;

  const htmValue = htmTokensHeld * ETFs.HTM.nav;
  const hdmValue = hdmTokensHeld * ETFs.HDM.nav;

  return (
    <>
      <Head>
        <title>Helix</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
        <Typography variant="h4">Portfolio</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" component="h2" align="center">
                    Total Portfolio Value
                  </Typography>
                  <Typography variant="h4" component="h3" align="center">
                    {formatCurrency(portfolioValue)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" component="h2" align="center">
                HTM Tokens
              </Typography>
              <Typography variant="h4" component="h3" align="center">
                {formatAmount(htmTokensHeld)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" component="h2" align="center">
                HTM Value
              </Typography>
              <Typography variant="h4" component="h3" align="center">
                {formatCurrency(htmValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" component="h2" align="center">
                HDM Tokens
              </Typography>
              <Typography variant="h4" component="h3" align="center">
                {formatAmount(hdmTokensHeld)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" component="h2" align="center">
                HDM Value
              </Typography>
              <Typography variant="h4" component="h3" align="center">
                {formatCurrency(hdmValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Portfolio;
