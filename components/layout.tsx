import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import AppBar from './AppBar'
import SideBar from './SideBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function Layout({ children }: PropsWithChildren) {

    return (
      <ThemeProvider theme={createTheme({
        palette: {
          mode: 'light',
          background: {
            default: '#F5F5F5', // Set the default background color
          },
        },
      })}>  
        <CssBaseline enableColorScheme/>
        <Box>
            <AppBar/>
            <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Box
                component="main"
                sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                }}
            >
                <Box sx={{ height: '64px' }} /> {/* This box ensures the AppBar stays on top */}
                {children}
            </Box>
            </Box>
        </Box>
      </ThemeProvider>
    );
  }
