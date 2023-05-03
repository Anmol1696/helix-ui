import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import BuySell from './pages/BuySell';
import Error from './pages/Error';
import Portfolio from './pages/Portfolio';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route
            path='/'
            element={<Portfolio />} 
            errorElement={<Error />} 
          />
          <Route path='/BuySell' element={<BuySell />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App;
