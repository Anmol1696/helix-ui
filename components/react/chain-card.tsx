import { Box, Stack, useTheme, Typography } from '@mui/material';
import { ChainCardProps } from '../types';
import Image from 'next/image';

export const ChainCard = (props: ChainCardProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        height: theme.spacing(6),
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
        overflow: 'hidden',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Box
        sx={{
          width: theme.spacing(5),
          height: theme.spacing(6),
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          alt={props.prettyName}
          src={props.icon || 'https://dummyimage.com/150/9e9e9e/ffffff&text=☒'}
          onError={(e) => {
            e.currentTarget.src =
              'https://dummyimage.com/150/9e9e9e/ffffff&text=☒';
            }
          }
          width={theme.spacing(5)}
          height={theme.spacing(5)}
        />
      </Box>
    </Stack>
  );
};
