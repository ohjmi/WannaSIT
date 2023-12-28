import React, { useState } from 'react';
import './Hamburger.css';
// import hamburgerIcon from '../../assets/images/icon/hamburger.svg';
// import logo from '../../assets/images/logo.svg';
// import close from '../../assets/images/icon/ex_white.svg';
import subway from '../../assets/images/icon/subway.svg';
import issue from '../../assets/images/icon/issue.svg';
import chat from '../../assets/images/icon/chat.svg';


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
    <div className='hamWrapper'>
      <div className={`hamMenu ${activeIndex !== null ? `active-${activeIndex + 1}` : ''}`} onClick={() => { hamToggle(); handleToggle(0); }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isMenuOpen && (
        <div className='hamCont'>
          <ul className='info'>
            <li>안녕하세요</li>
            <li>앉고싶어는 지하철 탑승 시 앉을</li>
            <li>가능성이 높은 칸을 안내하는 웹 어플리케이션입니다.</li>
          </ul>
          <ul className='menu'>
            <li>
              <img src={subway} alt='지하철 아이콘' />
              <span>지하철 노선도</span>
            </li>
            <li>
              <img src={issue} alt='이슈 아이콘' />
              <span>역 별 이슈</span>
            </li>
            <li>
              <img src={chat} alt='채팅 아이콘' />
              <span>실시간 채팅</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Hamburger;

// function Hamburger() {
//   const hamToggle = () => {

//   }
//   return (
//     <div className="hamWrapper">
//       <div className='hamMenu'>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <div className='hamCont'>
//         <header className="hamHeader">
//           <div className='headerTop'>
//             <p className='logo'> <img src={logo} alt='로고' /> </p>
//             <p className='closeBtn'> <img src={close} alt='닫기 버튼' /> </p>
//           </div>
//           <ul className='info'>
//             <li>안녕하세요</li>
//             <li>앉고싶어는 지하철 탑승 시 앉을</li>
//             <li>가능성이 높은 칸을 안내하는 웹 어플리케이션입니다.</li>
//           </ul>
//         </header>
//         <ul className='menu'>
//           <li>
//             <img src={subway} alt='지하철 아이콘' />
//             <span>지하철 노선도</span>
//           </li>
//           <li>
//             <img src={issue} alt='이슈 아이콘' />
//             <span>역 별 이슈</span>
//           </li>
//           <li>
//             <img src={chat} alt='채팅 아이콘' />
//             <span>실시간 채팅</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Hamburger;

// function Hamburger() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const hamToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="hamWrapper">
//       <div onClick={hamToggle}>
//         {isMenuOpen ? (
//           <img src={close} alt='닫기 버튼' />
//         ) : (
//           <img src={hamburgerIcon} alt='햄버거 메뉴' />
//         )}
//       </div>
//       {isMenuOpen && (
//         <div className='hamCont'>
//           <header className='hamHeader'>
//             <div className='headerTop'>
//               <p className='logo'> <img src={logo} alt='로고' /> </p>
//               <p className='closeBtn' onClick={hamToggle}> <img src={close} alt='닫기 버튼' /> </p>
//             </div>
//             <ul className='info'>
//               <li>안녕하세요</li>
//               <li>앉고싶어는 지하철 탑승 시 앉을</li>
//               <li>가능성이 높은 칸을 안내하는 웹 어플리케이션입니다.</li>
//             </ul>
//           </header>
//           <ul className='menu'>
//             <li>
//               <img src={subway} alt='지하철 아이콘' />
//               <span>지하철 노선도</span>
//             </li>
//             <li>
//               <img src={issue} alt='이슈 아이콘' />
//               <span>역 별 이슈</span>
//             </li>
//             <li>
//               <img src={chat} alt='채팅 아이콘' />
//               <span>실시간 채팅</span>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Hamburger;
