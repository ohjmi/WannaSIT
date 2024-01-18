import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home.jsx";
import Recommend from "./pages/RecommendPage/Recommend.jsx";
import RecommendDetail from "./pages/RecommendDetailPage/RecommendDetail.jsx";
import Board from './pages/BoardPage/Board.jsx';
import BoardWrite from './pages/BoardWritePage/BoardWrite.jsx'
import BoardDetail from './pages/BoardDetailPage/BoardDetail.jsx';
import Chat from "./pages/ChatPage/Chat.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cars" element={<Recommend />} />
        <Route path="/cars/info" element={<RecommendDetail />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/:boardId" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardWrite />} />
        {/* <Route path="/boards/edit" element={<BoardEdit />} /> */}
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={ <div>404 NOT FOUND</div> } />
      </Routes>
    </Router>
  </React.StrictMode>
);

