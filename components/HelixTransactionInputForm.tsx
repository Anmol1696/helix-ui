import { useAppDispatch, useAppSelector } from '../hooks';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import {switchBuySell } from "../features/wallet-data/buySellSlice";
import { RootState } from '../store';

const InputForm = () => {
  const { buySell: value } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonColor } = useAppSelector((state: RootState) => state.buySellState);
  const { buttonHighlightColor } = useAppSelector((state: RootState) => state.buySellState);

  const dispatch = useAppDispatch();
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
      >
        {value === "buy" ? "buy" : "sell"}
      </Button>
    </div>
  );
};

export default InputForm;
