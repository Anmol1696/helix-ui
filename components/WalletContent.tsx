import React from "react";

import {Box, Button, Grid, Typography, MenuItem, FormControl} from "@mui/material";

import type { NextPage } from 'next'
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';

const WalletContent: NextPage = () => {

  const dispatch = useAppDispatch();
  const { walletData, selectedHelixFund, isLoading } = useAppSelector((state: RootState) => state.walletCryptoData);

  const selectedHelixFundData = walletData[selectedHelixFund];


  return (
    <Box>
        <Typography variant="body1" mt={3}>{selectedHelixFundData.description}</Typography>
    </Box>
  );    
};
    
export default WalletContent;
