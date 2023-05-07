import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import {switchBuySell } from "../features/wallet-data/buySellSlice";
import { RootState } from '../store';
import { updateEtfQuantityInWallet } from '../features/wallet-data/walletDataSlice';
import { buyETF, sellETF } from "../features/treasury-data/treasuryDataSlice";


const InputForm = () => {
  const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);
  const { selectedHelixFund } = useAppSelector((state: RootState) => state.walletCryptoData);
  const { selectedToken } = useAppSelector((state: RootState) => state.walletCryptoData);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    setPayAmount(amount);
    setReceiveAmount(0);
  };

  const handleReceiveAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    setReceiveAmount(amount);
    setPayAmount(0);
  };

  const handleBuySell = () => {
    if (selectedToken) {
      const { ticker, buyFee, sellFee } = selectedToken;
      const quantity = value === "buy" ? receiveAmount! : payAmount!;
      const fee = value === "buy" ? buyFee : sellFee;
      const price = selectedToken.price;
      const totalPrice = quantity * price;
      const feeAmount = quantity * fee;
  
      // Update wallet token quantity
      dispatch(updateEtfQuantityInWallet({
        etfTicker: selectedHelixFund,
        quantity: quantity,
      }));
  
      if (value === "buy") {
        // Perform buy action
        dispatch(buyETF({
          ticker: selectedHelixFund,
          tokenTicker: ticker,
          amount: quantity,
          tokenPrice: price,
          fee: feeAmount,
        }));
      } else {
        // Perform sell action
        dispatch(sellETF({
          ticker: selectedHelixFund,
          tokenTicker: ticker,
          amount: quantity,
          tokenPrice: price,
          fee: feeAmount,
        }));
      }
  
      // Reset input fields
      setPayAmount(0);
      setReceiveAmount(0);
    }
  };
  
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "50%",
            height: "55px",
            backgroundColor: value === "buy" ? buttonColor : "#bfbfbf",
            color: value === "buy" ? "white" : "black",
            fontWeight: "bold",
            "&:hover": {
              background: buttonHighlightColor,
            },
          }}
          onClick={() => dispatch(switchBuySell("buy"))}
        >
          Buy
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            height: "55px",
            backgroundColor: value === "buy" ? "#bfbfbf" : buttonColor,
            color: value === "buy" ? "black" : "white",
            fontWeight: "bold",
            "&:hover": {
              background: buttonHighlightColor,
            },
          }}
          onClick={() => dispatch(switchBuySell("sell"))}
        >
          Sell
        </Button>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Pay"
          variant="filled"
          inputProps={{
            style: {
              height: "50px",
            },
          }}
          value={payAmount || ''}
          onChange={handlePayAmountChange}
        />
        <TextField
          id="filled-basic"
          label="Receive"
          variant="filled"
          inputProps={{
            style: {
              height: "50px",
            },
          }}
          value={receiveAmount || ''}
          onChange={handleReceiveAmountChange}
        />
        <TextField
          id="filled-basic"
          label="Fees"
          variant="filled"
          inputProps={{
            style: {
              height: "50px",
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          height: "60px",
          backgroundColor: buttonColor,
          fontWeight: "bold",
          "&:hover": {
            background: buttonHighlightColor,
          },
        }}
        onClick={handleBuySell}
      >
        {value === "buy" ? "buy" : "sell"}
      </Button>
    </div>
  );
};

export default InputForm;
