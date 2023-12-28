import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Hamburger from './components/Hamburger/Hamburger';
// import BottomNav from './components/BottomNav/BottomNav';
import StationPath from './components/StationPath/StationPath';
import CarRank from './components/CarRank/CarRank';

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home.js";
import Recommend from "./pages/RecommendPage/Recommend.js";
import RecommendDetail from "./pages/RecommendDetailPage/RecommendDetail.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StationPath />
    <CarRank />
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cars" element={<Recommend />} />
        <Route path="/cars/info" element={<RecommendDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

