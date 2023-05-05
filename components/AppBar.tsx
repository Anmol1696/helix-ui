import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useAppSelector, useAppDispatch } from '../hooks';
import { selectToggle, toggle } from '../features/sidebar-toggle/toggleSlice';
import { TopBar } from './AppBar.styles';

type AppBarProps = {
  title: string;
};

const AppBar: React.FunctionComponent<AppBarProps> = ({ title }) => {
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </TopBar>
    </ThemeProvider>
  );
};

export default AppBar;
