import React from "react";
import { Box, Typography } from "@mui/material";
import type { NextPage } from 'next';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const WalletContent: NextPage = () => {
  const { etfs, selectedHelixFund, isLoading } = useAppSelector((state: RootState) => state.walletCryptoData);
  const selectedHelixFundData = etfs[selectedHelixFund];

  return (
    <Box>
      {selectedHelixFundData && (
        <Typography variant="body1" mt={3}>
          {selectedHelixFundData.description}
        </Typography>
      )}
    </Box>
  );
};

export default WalletContent;
