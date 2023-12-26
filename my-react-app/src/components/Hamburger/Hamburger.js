import './Hamburger.css';
import Ex from '../../assets/images/icon/ex_white.svg';
import Subway from '../../assets/images/icon/subway.svg';
import Issue from '../../assets/images/icon/issue.svg';
import Chat from '../../assets/images/icon/chat.svg';

function HamCont() {
  return (
    <div className="Ham-wrapper">
      <div className='Ham_cont'>
        <header className="Ham-header">
          {/* <h1 className='logo'>ANGO</h1>
          <p className='ex-btn'> <img src = {Ex} alt='엑스 버튼'/> </p> */}
          <ul className='logo'>
            <li>
              ANGO
            </li>
            <li>
              <img src= {Ex} alt='엑스 버튼' />
            </li>
          </ul>
          <ul className='info'>
            <li>안녕하세요</li>
            <li>앉고싶어는 위치 기반 데이터를 통해</li>
            <li>앉을 가능성이 높은 자리를 제공합니다.</li>
          </ul>
        </header>
        <ul className='menu'>
          <li> <img src = {Subway} alt='지하철 아이콘' /> 지하철 노선도</li>
          <li> <img src = {Issue} alt='이슈 아이콘'/> 역 별 이슈</li>
          <li> <img src = {Chat} alt='채팅 아이콘'/>실시간 채팅</li>
        </ul>
      </div>
    </div>
  );
}

export default HamCont;
