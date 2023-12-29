import "./Recommend.css";
import React from "react";
import { useLocation } from 'react-router-dom';
import StationPath from '../../components/StationPath/StationPath';
import CarRank from '../../components/CarRank/CarRank';

function Recommend() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const startStation = query.get('startStation');
  const endStation = query.get('endStation');
  // const carNumber = query.get('carNumber');

  return (
    <div className="Recommend">
      <StationPath
        startStation={startStation} 
        endStation={endStation} 
      />
      <CarRank
        startStation={startStation} 
        endStation={endStation} 
      />
    </div>
  );
}

export default Recommend;
