import rightArrow from '../../assets/images/icon/right-arrow.svg';

function StationPath({ stationStart, stationEnd }) {
    return (
      <div>
        <ul className="stationTitle">
            <li>출발역</li>
            <li>도착역</li>
        </ul>
        <ul className="stationName">
            <li>{stationStart}</li>
            <li><img src={rightArrow} alt='오른쪽 화살표'/></li>
            <li>{stationEnd}</li>
        </ul>
      </div>
    );
  }
  
  export default StationPath;