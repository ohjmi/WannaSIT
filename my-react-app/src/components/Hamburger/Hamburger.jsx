import React, { useState } from "react";
import "./Hamburger.css";
import subway from "../../assets/images/icon/subway.svg";
import issue from "../../assets/images/icon/issue.svg";
import chat from "../../assets/images/icon/chat.svg";

function Hamburger() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hamToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="Hamburger">
      <div
        className={`hamMenu ${
          activeIndex !== null ? `active-${activeIndex + 1}` : ""
        }`}
        onClick={() => {
          hamToggle();
          handleToggle(0);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isMenuOpen && (
        <div className="hamCont">
          <div className="infoWrap">
            <ul className="info">
              <li>안녕하세요</li>
              <li>앉고싶어는 지하철 탑승 시 앉을 가능성이</li>
              <li>높은 칸을 안내하는 웹 어플리케이션입니다.</li>
            </ul>
          </div>
          <div className="menuWrap">
            <ul className="menu">
              <li>
                <a href="/">
                  <img src={subway} alt="지하철 아이콘" />
                  <span>지하철 노선도</span>
                </a>
              </li>
              <li>
                <a href="/boards">
                  <img src={issue} alt="이슈 아이콘" />
                  <span>역 별 이슈</span>
                </a>
              </li>
              <li>
                <a href="/chat">
                  <img src={chat} alt="채팅 아이콘" />
                  <span>실시간 채팅</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
