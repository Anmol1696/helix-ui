import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import BuySell from './pages/BuySell';
import Error from './pages/Error';
import Portfolio from './pages/Portfolio';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <AppBar />
        <SideBar />
        <Routes>
          <Route
            path='/'
            element={<Portfolio />} 
          />
          <Route path='/BuySell' element={<BuySell />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App;
