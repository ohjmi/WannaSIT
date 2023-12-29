

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
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cars" element={<Recommend />} />
        <Route path="/cars/info" element={<RecommendDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

