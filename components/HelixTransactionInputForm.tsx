import { useState, useEffect } from 'react';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from '../hooks';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import { RootState } from '../store';
import { setOpenModal, switchBuySell, setNotificationMessage } from "../features/wallet-data/buySellSlice";
import { fetchCryptoData } from '../features/treasury-data/treasuryDataSlice';
import { updateTokenQuantityInWallet } from '../features/wallet-data/walletDataSlice';
import { calculateFee, buyETF, sellETF } from "../features/treasury-data/treasuryDataSlice";
import { formatPrice } from '../utils/utils';

const InputForm = () => {
  const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);
  const { selectedToken, selectedHelixFund, tokensInWallet } = useAppSelector((state: RootState) => state.walletCryptoData);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [isInputValid, setInputValid] = useState(true);
  const [hasEnoughTokens, setHasEnoughTokens] = useState(true);
  const [invalidInputMessage, setInputValidMessage] = useState('');
  const [notEnoughTokensInWalletMessage, setNotEnoughTokensInWalletMessage] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const { ETFs } = useAppSelector((state: RootState) => state.treasuryData);
 
  const handleSwitchBuySell = () => {
    const buy = value === "buy";
    dispatch(switchBuySell(buy ? "sell" : "buy"));
    setPayAmount(0);
    setReceiveAmount(0);
    setFeeAmount(0);
  }

  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const isFloat = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/.test(input);
    setInputValid(isFloat);
    isFloat ? setInputValidMessage('') : setInputValidMessage('Input is invalid');
    setHasEnoughTokens(true);
    if (isFloat) {
      const amount = parseFloat(event.target.value);
    
      if (selectedToken && selectedHelixFund) {
        const { tokenData, buyFee, sellFee } = ETFs[selectedHelixFund].holdings[selectedToken];
    
        const buy = value === "buy";
        const quantity = amount;
        const fee = buy ? buyFee : sellFee;
        const { nav } = ETFs[selectedHelixFund];
        const amountValid =
        buy
          ? quantity <= tokensInWallet[selectedToken]
          : quantity <= tokensInWallet[selectedHelixFund];
        if (quantity) {
          setHasEnoughTokens(amountValid);
        }
        amountValid ? setNotEnoughTokensInWalletMessage('') : setNotEnoughTokensInWalletMessage('Not enough tokens in wallet');
        if (amountValid) {
          if (tokenData) {
            const transactionValue = buy ? quantity * tokenData!.price : quantity * nav;
      
            const fees = calculateFee(transactionValue, fee);
            const adjustedTransactionValue = transactionValue - fees;
            const newTokenQuantity = buy
              ? quantity
              : adjustedTransactionValue / tokenData!.price;
            const newETFQuantity = buy
              ? adjustedTransactionValue / nav
              : quantity;
    
            setPayAmount(amount);
            setReceiveAmount(buy ? newETFQuantity : newTokenQuantity);
            setFeeAmount(fees);
          }
        } else {
          setPayAmount(0);
          setReceiveAmount(0);
          setFeeAmount(0);
        }
      }
    }
  };

  const handleBuySell = () => {
    if (selectedToken && selectedHelixFund) {
      const { tokenData, buyFee, sellFee } = ETFs[selectedHelixFund].holdings[selectedToken];
      const { nav } = ETFs[selectedHelixFund];
      const buy = value === "buy";
      const quantity = payAmount!;
      const fee = buy ? buyFee : sellFee;
      if (tokenData) {
        const transactionValue =
        buy 
        ? quantity * tokenData.price
        : quantity * nav;
        const fees = calculateFee(transactionValue, fee);
        const adjustedTransactionValue = transactionValue - fees;
        const price = tokenData.price;
        const quantityTransacted = 
          buy ? adjustedTransactionValue / price : adjustedTransactionValue / nav;

        const newTokenQuantity =
          buy
          ? tokensInWallet[selectedToken] - quantity
          : tokensInWallet[selectedToken] + quantityTransacted;
        const newETFQuantity =
          buy
          ? tokensInWallet[selectedHelixFund] + quantityTransacted
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
          dispatch(setNotificationMessage("Successfully bought " + quantityTransacted + " " + selectedHelixFund + "!"));
        } else {
          // Perform sell action
          dispatch(sellETF({
            ticker: selectedHelixFund,
            tokenTicker: selectedToken,
            amount: quantity,
            tokenPrice: price,
            fee: fees,
          }));
          dispatch(setNotificationMessage("Successfully sold " + quantity + " " + selectedHelixFund + "!"));
        }
      }
      // Reset input fields
      setPayAmount(0);
      setReceiveAmount(0);
      setFeeAmount(0);
      dispatch(setOpenModal(false));
    }
  };
  
  const tokenToPay = value === 'buy' ? selectedToken: selectedHelixFund;
  const tokenToReceive = value === 'buy' ? selectedHelixFund : selectedToken;
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
          onClick={() => handleSwitchBuySell()}
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
          onClick={() => handleSwitchBuySell()}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <IconButton
                aria-label="icon"
              >
                <Image src={`/${tokenToPay.toLowerCase()}.svg`} alt={tokenToPay} width={24} height={24} />
              </IconButton>
            </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                  {tokenToPay.toUpperCase()}
                </InputAdornment>
            ),
          }}
          onChange={handlePayAmountChange}
          error={!isInputValid || !hasEnoughTokens}
          helperText={!hasEnoughTokens ? notEnoughTokensInWalletMessage : invalidInputMessage}
        />
        <TextField
          disabled
          id="filled-basic"
          label="Receive"
          variant="filled"
          inputProps={{
            style: {
              height: "50px",
            },
          }}
          value={receiveAmount.toFixed(6) || '0'}          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <IconButton
                aria-label="icon"
              >
                <Image src={`/${tokenToReceive.toLowerCase()}.svg`} alt={tokenToReceive} width={24} height={24} />
              </IconButton>
            </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                  {tokenToReceive.toUpperCase()}
                </InputAdornment>
            ),
          }}
        />
        <TextField
          id="filled-basic"
          disabled
          label="Fees"
          variant="filled"
          inputProps={{
            style: {
              height: "50px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                $
              </InputAdornment>
            ),
          }}
          value={formatPrice(feeAmount || 0)}    
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
