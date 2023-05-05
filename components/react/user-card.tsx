import React from 'react';
import { Typography, Stack, Avatar, Box } from '@mui/material';
import { ConnectedUserCardType } from '../types';

export const ConnectedUserInfo = ({
  username,
  icon
}: ConnectedUserCardType) => {
  return (
    <Stack spacing={1} alignItems="center">
      {username && (
        <>
          <Box
            display={icon ? 'block' : 'none'}
            sx={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <Avatar src={icon} sx={{ width: '100%', height: '100%' }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {username}
          </Typography>
        </>
      )}
    </Stack>
  );
};
