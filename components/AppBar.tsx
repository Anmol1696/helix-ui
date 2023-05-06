import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { WalletSection } from '../components';

import { useAppSelector, useAppDispatch } from '../hooks';
import { selectToggle, toggle } from '../features/sidebar-toggle/toggleSlice';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface TopBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const drawerWidth: number = 240;
  
  export const TopBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<TopBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const AppBar: React.FunctionComponent = () => {
  const open = useAppSelector(selectToggle);
  const dispatch = useAppDispatch();
  
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline enableColorScheme/>
      <TopBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggle())}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1} />
          <WalletSection />
        </Toolbar>
      </TopBar>
    </ThemeProvider>
  );
};

export default AppBar;
