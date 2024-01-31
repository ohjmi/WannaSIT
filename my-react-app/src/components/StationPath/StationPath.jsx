import React from 'react';
import rightArrow from '../../assets/images/icon/rightArrow.svg';
import './StationPath.css';

function StationPath({ startStation, endStation }) {
    return (
      <div className='StationPath'>
        <ul className="startStation">
            <li>출발역</li>
            <li>{startStation}</li>
        </ul>
        <p className='stationArrow'><img src={rightArrow} alt='오른쪽 화살표'/></p>
        <ul className="endStation">
            <li>도착역</li>
            <li>{endStation}</li>
        </ul>
      </div>
    );
  }
  
  export default StationPath;