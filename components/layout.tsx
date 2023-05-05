import { PropsWithChildren, useEffect, useState} from 'react';

import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import AppBar from './AppBar'
import SideBar from './SideBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type LayoutProps = PropsWithChildren<{
    title: string;
}>;

export default function Layout({ children, title }: LayoutProps) {
    const router = useRouter();
    const [pageTitle, setPageTitle] = useState(title);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
          // Extract the page name from the URL
          let pageTitle = url.split('/').pop() || '';
          pageTitle = pageTitle ? pageTitle : 'Helix';
          setPageTitle(pageTitle);
          document.title = pageTitle;
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };
      }, [router.events]);

    return (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline enableColorScheme/>
        <Box sx={{ display: 'flex' }}>
            <AppBar title={pageTitle}/>
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
