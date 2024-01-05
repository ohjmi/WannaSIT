import React, { useState } from "react";
import "./BottomNav.css";
import issue from "../../assets/images/icon/issue.svg";
import chat from "../../assets/images/icon/chat.svg";
import closebtn from "../../assets/images/icon/closebtn.svg";

function BottomNav() {
  const [handleNavContainer, setHandleNavContainer] = useState(false);
  const hanldeNavBtn = () => {
    setHandleNavContainer(!handleNavContainer);
    setHandleNavOnBtn(!handleNavOnBtn);
  };
  const [handleNavOnBtn, setHandleNavOnBtn] = useState(true);
  const hanldeNavOnBtn = () => {
    setHandleNavOnBtn(!handleNavOnBtn);
    setHandleNavContainer(!handleNavContainer);
  };

  return (
    <div>
      {handleNavOnBtn && (
        <button className="navOnBtn" onClick={hanldeNavOnBtn}>
          소통해요
        </button>
      )}
      {handleNavContainer && (
        <div className="bottomNavContainer">
          <nav className="bottomNav">
            <ul className="bottomNavLink">
                <a href="/board">
                  <img src={issue} alt="게시판 아이콘" />역 별 이슈
                </a>
                <a href="/chat">
                  <img src={chat} alt="채팅 아이콘" />
                  실시간 채팅
                </a>
            </ul>
          </nav>
          <button className="navCloseBtn" onClick={hanldeNavBtn}>
            <img src={closebtn} alt="닫기버튼" />
          </button>
        </div>
      )}
      {handleNavContainer && <div className="blackBox"></div>}
    </div>
  );
}

export default BottomNav;
