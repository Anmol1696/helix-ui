import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'

import Portfolio from './pages/Portfolio';
import BuySell from './pages/BuySell';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Portfolio />} />
          <Route path='/team' element={<BuySell />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App;
