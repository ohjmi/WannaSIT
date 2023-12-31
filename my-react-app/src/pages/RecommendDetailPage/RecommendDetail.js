import "./RecommendDetail.css";
import StationPath from "../../components/StationPath/StationPath";
import { useLocation } from "react-router-dom";
import greenCircle from "../../assets/images/icon/greenCircle.svg";
import yellowCircle from "../../assets/images/icon/yellowCircle.svg";
import redCircle from "../../assets/images/icon/redCircle.svg";
import { useState } from "react";

function RecommendDetail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const startStation = query.get('startStation');
  const endStation = query.get('endStation');
  const carNumber = query.get("carNumber");

  const [openChance, setOpenChance] = useState(true);
  const [chanceColor, setChanceColor] = useState("#C0EF52");
  const [openHighCars, setOpenHighCars] = useState(false);
  const [highCarsColor, setHighCarsColor] = useState("white");

  const handleChance = () => {
    setOpenChance(true);
    setOpenHighCars(false);
    setChanceColor("#C0EF52")
    setHighCarsColor("white")
  };

  const handleHighCars = () => {
    setOpenChance(false);
    setOpenHighCars(true);
    setChanceColor("white")
    setHighCarsColor("#C0EF52")
  };

  return (
    <div className="RecommendDetail">
      <StationPath startStation={startStation} endStation={endStation} />
      <div className="carSelectOpt">
        <div className="openChance" onClick={handleChance} style={{backgroundColor : chanceColor}}>
          {carNumber}
        </div>
        <div className="openHighCars" onClick={handleHighCars} style={{backgroundColor : highCarsColor}}>
          칸 이동
        </div>
      </div>

      <div className="StationInPath"></div>

      {openChance && (
        <div className="Chance">
          <p>
            앉을 가능성을 알려드려요
            <img src={greenCircle} alt="초록원" />
            <img src={yellowCircle} alt="노란원" />
            <img src={redCircle} alt="빨간원" />
          </p>
        </div>
      )}

      {openHighCars && (
        <div className="HighCars">
          <p>앉을 가능성이 높은 호차를 알려드려요</p>
        </div>
      )}
    </div>
  );
}

export default RecommendDetail;
