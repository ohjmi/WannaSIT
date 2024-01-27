import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BottomNav.css";
import issue from "../../assets/images/icon/issue.svg";
import chat from "../../assets/images/icon/chat.svg";
import closeBtn from "../../assets/images/icon/closeBtn.svg";

function BottomNav() {
  const [handleNavOnBtn, setHandleNavOnBtn] = useState(true);
  const [handleNavContainer, setHandleNavContainer] = useState(false);
  const navigate = useNavigate();
  
  const handleNavBtn = () => {
    setHandleNavContainer(!handleNavContainer);
    setHandleNavOnBtn(!handleNavOnBtn);
  };


  return (
    <div className="BottomNav">
      {handleNavOnBtn && (
        <button className="navOnBtn" onClick={handleNavBtn}>
          소통해요
        </button>
      )}
      {handleNavContainer && (
        <div className="bottomNavContainer">
          <nav className="bottomNav">
            <ul className="bottomNavLink">
                <li onClick={() => navigate("/boards")}>
                  <img src={issue} alt="게시판 아이콘" />역 별 이슈
                </li>
                <li onClick={() => navigate("/chat")}>
                  <img src={chat} alt="채팅 아이콘" />
                  실시간 채팅
                </li>
            </ul>
          </nav>
          <button className="navCloseBtn" onClick={handleNavBtn}>
            <img src={closeBtn} alt="닫기버튼" />
          </button>
        </div>
      )}
      {handleNavContainer && <div className="blackBox"></div>}
    </div>
  );
}

export default BottomNav;