import React from 'react';
import rightArrow from '../../assets/images/icon/rightArrow.svg';
import './StationPath.css';

function StationPath({ startStation, endStation }) {
    return (
      <div className='StationPath'>
        <ul className="stationTitle">
            <li>출발역</li>
            <br/>
            <li>도착역</li>
        </ul>
        <ul className="stationName">
            <li>{startStation}</li>
            <li><img src={rightArrow} alt='오른쪽 화살표'/></li>
            <li>{endStation}</li>
        </ul>
      </div>
    );
  }
  
  export default StationPath;