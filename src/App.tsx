import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';

import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import BuySell from './pages/BuySell';
import Error from './pages/Error';
import Portfolio from './pages/Portfolio';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
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
        <Routes>
          <Route
            path='/'
            element={<Portfolio />} 
          />
          <Route path='/BuySell' element={<BuySell />} />
          <Route path='*' element={<Error />} />
        </Routes>
        </Box>
      </Box>
      </Router> 
    </>
  )
}

export default App;
