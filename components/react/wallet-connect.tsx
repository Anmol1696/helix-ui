import React, { MouseEventHandler, ReactNode } from 'react';
import {
  Button,
  Icon,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import { IoWallet } from 'react-icons/io5';
import { WalletStatus } from '@cosmos-kit/core';
import { useStyles } from './wallet-connect.styles';

export const ConnectWalletButton = ({
  buttonText,
  isDisabled,
  icon,
  onClickConnectBtn,
}: {
  buttonText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  onClickConnectBtn?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Button
      fullWidth
      size="large"
      disabled={isDisabled}
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={onClickConnectBtn}
      startIcon={<Icon className={classes.icon}>{icon ? icon : <IoWallet />}</Icon>}
    >
      {buttonText ? buttonText : 'Connect Wallet'}
    </Button>
  );
};

export const Disconnected = ({ buttonText, onClick }: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />
  );
};

export const Connected = ({ buttonText, onClick }: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />
  );
};

export const Connecting = () => {
  return <ConnectWalletButton isLoading />;
};

export const Rejected = ({
  buttonText,
  wordOfWarning,
  onClick,
}: {
  buttonText: string;
  wordOfWarning?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const theme = useTheme();
  const bg = theme.palette.warning.light;

  return (
    <Stack>
      <ConnectWalletButton
        buttonText={buttonText}
        isDisabled={false}
        onClickConnectBtn={onClick}
      />
      {wordOfWarning && (
        <Stack
          direction="row"
          alignItems="center"
          borderRadius="md"
          bgcolor={bg}
          color="text.primary"
          p={2}
        >
          <Typography variant="body1">
            <strong>Warning:&ensp;</strong>
            {wordOfWarning}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

type ErrorProps = {
  buttonText: string;
  wordOfWarning?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Error = ({
  buttonText,
  wordOfWarning,
  onClick
}: ErrorProps) => {
  const theme = useTheme();
  const bg = theme.palette.error.dark;

  return (
    <Stack>
      <ConnectWalletButton
        buttonText={buttonText}
        isDisabled={false}
        onClickConnectBtn={onClick}
      />
      {wordOfWarning && (
        <Stack
          direction="row"
          borderRadius="md"
          bgcolor={bg}
          color="blackAlpha.900"
          p={4}
          spacing={1}
        >
          <Typography variant="body1">
            <strong>Warning:&ensp;</strong>
            {wordOfWarning}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export const NotExist = ({
  buttonText,
  onClick
}: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ConnectWalletButton
      buttonText={buttonText}
      isDisabled={false}
      onClickConnectBtn={onClick}
    />
  );
};

export const WalletConnectComponent = ({
  walletStatus,
  disconnect,
  connecting,
  connected,
  rejected,
  error,
  notExist
}: {
  walletStatus: WalletStatus;
  disconnect: ReactNode;
  connecting: ReactNode;
  connected: ReactNode;
  rejected: ReactNode;
  error: ReactNode;
  notExist: ReactNode;
}) => {
  switch (walletStatus) {
    case WalletStatus.Disconnected:
      return <>{disconnect}</>;
    case WalletStatus.Connecting:
      return <>{connecting}</>;
    case WalletStatus.Connected:
      return <>{connected}</>;
    case WalletStatus.Rejected:
      return <>{rejected}</>;
    case WalletStatus.Error:
      return <>{error}</>;
    case WalletStatus.NotExist:
      return <>{notExist}</>;
    default:
      return <>{disconnect}</>;
  }
};
