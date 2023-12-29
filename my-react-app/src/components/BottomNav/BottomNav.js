import React from "react";
import "./BottomNav.css";
import issue from "../../assets/images/icon/issue.svg";
import chat from "../../assets/images/icon/chat.svg";
import closebtn from "../../assets/images/icon/closebtn.svg";

function BottomNav() {
  const openNav = () => {
    const navButton = document.querySelector(".NavOnBtn");
    const navMenu = document.querySelector(".BottomNavContainer");
    const blackBox = document.querySelector(".blackBox");
    if (navButton) {
      navButton.style.display = "none";
      navMenu.style.display = "block";
      blackBox.style.display = "block";
    }
  };
  const closeNav = () => {
    const navButton = document.querySelector(".NavOnBtn");
    const navMenu = document.querySelector(".BottomNavContainer");
    const blackBox = document.querySelector(".blackBox");
    if (navMenu) {
      navButton.style.display = "block";
      navMenu.style.display = "none";
      blackBox.style.display = "none";
    }
  };
  return (
    <div>
      <button className="NavOnBtn" onClick={openNav}>
        소통해요
      </button>
      <div className="blackBox"></div>
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
          <img src={closebtn} alt="닫기버튼" />
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
