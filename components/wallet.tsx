import { useChain } from '@cosmos-kit/react';
import { WalletStatus } from '@cosmos-kit/core';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Tooltip } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import {
  Error,
  Connected,
  Connecting,
  ConnectStatusWarn,
  Disconnected,
  NotExist,
  Rejected,
  RejectedWarn,
  WalletConnectComponent,
  ChainCard,
} from '../components';
import { chainName } from '../config';

export const WalletSection = () => {
  const {
    connect,
    openView,
    status,
    username,
    address,
    message,
    wallet,
    chain: chainInfo,
    logoUrl,
  } = useChain(chainName);

  const chain = {
    chainName,
    label: chainInfo.pretty_name,
    value: chainName,
    icon: logoUrl,
  };

  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={status}
      disconnect={<Disconnected buttonText="Connect Wallet" onClick={connect} />}
      connecting={<Connecting />}
      connected={<Connected buttonText={username || 'My Wallet'} onClick={openView} />}
      rejected={<Rejected buttonText="Reconnect" onClick={connect} />}
      error={<Error buttonText="Change Wallet" onClick={openView} />}
      notExist={<NotExist buttonText="Install Wallet" onClick={openView} />}
    />
  );

  const connectWalletWarn = (
    <ConnectStatusWarn
      walletStatus={status}
      rejected={<RejectedWarn wordOfWarning={`${wallet?.prettyName}: ${message}`} />}
      error={<RejectedWarn wordOfWarning={`${wallet?.prettyName}: ${message}`} />}
    />
  );

  const addressBtn = address && (
    <CopyToClipboard text={address}>
      <Tooltip title="Copy address">
        <Box display="flex" alignItems="center">
          <Typography variant="body2" noWrap>
            {`${address.substring(0, 8)}...${address.substring(address.length - 4)}`}
          </Typography>
          <Box ml={1}>
            <IconButton>
              <FaCopy />
            </IconButton>
          </Box>
        </Box>
      </Tooltip>
    </CopyToClipboard>
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {status === WalletStatus.Connected && (
        <Box display="flex" alignItems="center">
          <ChainCard prettyName={chain?.label || chainName} icon={chain?.icon} />
        </Box>
      )}
      <Box display="flex" alignItems="center">
        {status === WalletStatus.Connected && (
          <Box ml={2} mr={3}>
            {addressBtn}
          </Box>
        )}
        <Box>{connectWalletButton}</Box>
      </Box>
      {connectWalletWarn}
    </Box>
  );
};
