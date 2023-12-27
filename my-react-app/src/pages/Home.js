import React from 'react';
// import { useState } from 'react';
import HamburgerIcon from '../assets/images/icon/hamburger.svg';

// const HamMenu = () => {
//     const [isOpen, setMenu] = useState(false); // 메뉴 초기값을 false로 설정

//     const toggleMenu = () => {
//         setMenu(isOpen => !isOpen); // on, off 개념 boolean
//     }

//     return (
//         <div className='header'>
//             <ul className='header-wrapper'>
//                 <li><MenuIcon onclick= {() => toggleMenu()}></MenuIcon></li>
//                 <li><img src={ HamburgerIcon }/></li>
//             </ul>
//             <ul className={isOpen ? 'show' : 'hidemenu'}>
//                 <li>1</li>
//                 <li>2</li>
//                 <li>3</li>
//                 <li>4</li>
//             </ul>
//         </div>
//     )
// }


function Home() {
  return (
    <div className="Home-wrapper">
        <header className="Ham-menu">
            <img src={ HamburgerIcon } alt='햄버거 메뉴'/>
        </header>
    </div>
  );
}

export default Home;
