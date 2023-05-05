import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import AppBar from './AppBar'
import SideBar from './SideBar'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar />
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
                    <main>{children}</main>
                </Box>
            </Box>
        </>
    );
}
