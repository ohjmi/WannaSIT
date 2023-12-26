import React from "react";
import "./BottomNav.css";
import issue from "../../assets/images/issue.svg";
import chat from "../../assets/images/chat.svg";
import X from "../../assets/images/X.svg";

function BottomNav() {
  const openNav = () => {
    const navMenu = document.querySelector(".BottomNavContainer");
    const navButton = document.querySelector(".NavOnBtn");
    if (navButton) {
      navButton.style.display = "none";
      navMenu.style.display = "block";
    }
  };
  const closeNav = () => {
    const navMenu = document.querySelector(".BottomNavContainer");
    const navButton = document.querySelector(".NavOnBtn");
    if (navMenu) {
      navMenu.style.display = "none";
      navButton.style.display = "block";
    }
  };
  return (
    <div>
      <button className="NavOnBtn" onClick={openNav}>
        소통해요
      </button>
      <div className="BottomNavContainer">
        <nav className="BottomNav">
          <ul className="BottomNavLink">
            <li>
              <img src={issue} alt="게시판 아이콘" />역 별 이슈
            </li>
            <li>
              <img src={chat} alt="채팅 아이콘" />
              실시간 채팅
            </li>
          </ul>
        </nav>
        <button className="NavCloseBtn" onClick={closeNav}>
          <img src={X} alt="X" />
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
