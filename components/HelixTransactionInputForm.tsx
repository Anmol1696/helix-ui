import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { RootState } from '../store';
import { switchBuySell } from "../features/wallet-data/buySellSlice";
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { updateTokenQuantityInWallet } from '../features/wallet-data/walletDataSlice';
import { calculateFee, buyETF, sellETF } from "../features/treasury-data/treasuryDataSlice";

const InputForm = () => {
  const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);
  const { selectedToken, selectedHelixFund, tokensInWallet } = useAppSelector((state: RootState) => state.walletCryptoData);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const { ETFs } = useAppSelector((state: RootState) => state.treasuryData);

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
    if (selectedToken && selectedHelixFund) {
      const { tokenData, buyFee, sellFee } = ETFs[selectedHelixFund].holdings[selectedToken];
      const { nav } = ETFs[selectedHelixFund];
      const buy = value === "buy";
      const quantity = buy ? receiveAmount! : payAmount!;
      const fee = buy ? buyFee : sellFee;
      if (tokenData) {
        const transactionValue =
        buy 
        ? quantity * tokenData.price
        : quantity * nav;
        const fees = calculateFee(transactionValue, fee);
        const adjustedTransactionValue = transactionValue - fees;
        const price = tokenData.price;
        const newTokenQuantity =
          buy
          ? tokensInWallet[selectedToken] - quantity
          : tokensInWallet[selectedToken] + adjustedTransactionValue / price;
        const newETFQuantity =
          buy
          ? tokensInWallet[selectedHelixFund] + adjustedTransactionValue / nav
          : tokensInWallet[selectedHelixFund] - quantity;
  
        // Update wallet token quantities
        dispatch(updateTokenQuantityInWallet({
          token: selectedToken,
          quantity: newTokenQuantity,
        }));
        dispatch(updateTokenQuantityInWallet({
          token: selectedHelixFund,
          quantity: newETFQuantity,
        }));
    
        if (buy) {
          // Perform buy action
          dispatch(buyETF({
            ticker: selectedHelixFund,
            tokenTicker: selectedToken,
            amount: quantity,
            tokenPrice: price,
            fee: fees,
          }));
        } else {
          // Perform sell action
          dispatch(sellETF({
            ticker: selectedHelixFund,
            tokenTicker: selectedToken,
            amount: quantity,
            tokenPrice: price,
            fee: fees,
          }));
        }
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
