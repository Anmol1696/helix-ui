import React, { useEffect} from "react";
import {
    Box,
    Button,
    Grid,
    Typography,
    MenuItem,
    FormControl,
    Modal,
    Snackbar,
  } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import WalletContent from "../components/WalletContent";

import CryptoTable from "../components/CryptoTable";
import HelixTransactionModal from "../components/HelixTransactionModal";
import {switchBuySell } from "../features/wallet-data/buySellSlice";
import {selectHelixFund, selectToken} from "../features/wallet-data/walletDataSlice";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
    const dispatch = useAppDispatch();
    const { etfs, selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);

    useEffect(() => {
        document.title = 'Buy and Sell'
    }, []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const handleCloseNotification = () => {
        setNotificationMessage("");
    }
    const handleBuyModalOpen = () => {
        setIsModalOpen(true);
        dispatch(switchBuySell("buy"))
        dispatch(selectToken('btc'))

    }
    const handleSellModalOpen = () => {
        setIsModalOpen(true);
        dispatch(switchBuySell("sell"))
        dispatch(selectToken('btc'))

    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setNotificationMessage("Test");
    }

    const handleSelectHelixFund = (event: SelectChangeEvent) => {
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
                                onChange={handleSelectHelixFund}
                                sx={{
                                    background: '#3F51B5',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    borderRadius: 3,
                                    "&:hover": {
                                        background: "#1565c0",
                                      },
                                }}
                            >
                                {helixFundMenuItems}
                            </Select>
                        </FormControl>
                        <WalletContent/>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#3F51B5",
                                mr: 2,
                                "&:hover": {
                                    background: "#1565c0",
                                },
                            }}
                            onClick={handleBuyModalOpen}
                        >
                            Buy HTM
                        </Button>
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
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#d32f2f",
                                "&:hover": {
                                    background: "#ef5350",
                                },
                                }}
                            onClick={handleSellModalOpen}>
                            Sell HTM
                        </Button>
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
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(notificationMessage)}
            autoHideDuration={5000}
            onClose={handleCloseNotification}
            >
            <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                {notificationMessage}
            </Alert>
        </Snackbar>
    </>
  );
};
