import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Hamburger from './components/Hamburger/Hamburger';
// import BottomNav from './components/BottomNav/BottomNav';
import StationPath from './components/StationPath/StationPath';
import CarRank from './components/CarRank/CarRank';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StationPath />
    <CarRank />
  </React.StrictMode>
);

