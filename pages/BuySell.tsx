import React, { useEffect} from "react";
import type { NextPage } from 'next'
import {Box, Button, Grid, Typography, MenuItem, FormControl, Modal} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import WalletContent from "../components/WalletContent";

import CryptoTable from "../components/CryptoTable";
import HelixTransactionModal from "../components/HelixTransactionModal";
import {switchBuySell } from "../features/wallet-data/buySellSlice";
import {selectHelixFund} from "../features/wallet-data/walletDataSlice";

const BuySell: NextPage = () => {
    const dispatch = useAppDispatch();
    const { etfs, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);

    useEffect(() => {
        document.title = 'Buy and Sell'
    }, []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleBuyModalOpen = () => {
        setIsModalOpen(true);
        dispatch(switchBuySell("buy"))

    }
    const handleSellModalOpen = () => {
        setIsModalOpen(true);
        dispatch(switchBuySell("sell"))

    }
    const handleModalClose = () => setIsModalOpen(false);

    const handleSelectHeflixFund = (event: SelectChangeEvent) => {
        dispatch(selectHelixFund(event.target.value as string));
    };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const helixFundMenuItems = Object.entries(etfs).map(([ticker, etf]) => (
        <MenuItem value={ticker} key={ticker}>
          {etf.name}
        </MenuItem>
      ));

    return (
        <>
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h4">Buy and Sell Helix Funds</Typography>
                        <FormControl sx={{width: '80%', mt: 3}}>
                            <Select
                                labelId="market-name"
                                id="market-name"
                                value={selectedHelixFund}
                                onChange={handleSelectHeflixFund}
                                sx={{background: '#3e4ed9', color: 'white', fontSize: 18, fontWeight: "bold", textAlign: "center", borderRadius: 3}}
                            >
                                {helixFundMenuItems}
                            </Select>
                        </FormControl>
                        <WalletContent/>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3}>
                        <Button variant="contained" sx={{backgroundColor: "#3e4ed9", mr: 2}} onClick={handleBuyModalOpen} >Buy HTM</Button>
                        <Modal
                            open={isModalOpen}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <HelixTransactionModal />
                            </Box>
                            
                        </Modal>
                        <Button variant="contained" sx={{backgroundColor: "#d93f4e"}} onClick={handleSellModalOpen}>Sell HTM</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <div style={{ margin: '20px 20px 50px 50px'}}>
                        <div style={{ margin: '0px 0px 25px 0px', textAlign: 'center'}}>
                            <Typography variant="h5">Cryptocurrency Market Caps</Typography>
                        </div>
                        <div>
                            <CryptoTable />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );    
};
    
export default BuySell;
