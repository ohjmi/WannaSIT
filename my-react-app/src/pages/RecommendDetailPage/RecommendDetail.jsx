import "./RecommendDetail.css";
import StationPath from "../../components/StationPath/StationPath";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Hamburger from "../../components/Hamburger/Hamburger";
import StationsInPath from "../../components/StationsInPath/StationsInPath";
import Chance from "../../components/Chance/Chance";
import HighCars from "../../components/HighCars/HighCars";
import api from "../../services/api";

function RecommendDetail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const startStation = query.get("startStation");
  const endStation = query.get("endStation");
  const carNumber = query.get("carNumber");

  const [openChance, setOpenChance] = useState(true);
  const [chanceColor, setChanceColor] = useState("#C0EF52");
  const [openHighCars, setOpenHighCars] = useState(false);
  const [highCarsColor, setHighCarsColor] = useState("white");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChance = () => {
    setOpenChance(true);
    setOpenHighCars(false);
    setChanceColor("#C0EF52");
    setHighCarsColor("#FFFFFF");
  };

  const handleHighCars = () => {
    setOpenChance(false);
    setOpenHighCars(true);
    setChanceColor("#FFFFFF");
    setHighCarsColor("#C0EF52");
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/cars/info?startStation=${startStation}&endStation=${endStation}&carNumber=${carNumber}`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("에러:", error);
        setLoading(false);
      });
  }, [startStation, endStation, carNumber]);

  
  return (
    <div className="RecommendDetail">
      <Hamburger />
      <StationPath startStation={startStation} endStation={endStation} />
      <div className="carSelectOpt">
        <div
          className="openChance"
          onClick={handleChance}
          style={{ backgroundColor: chanceColor }}
        >
          {carNumber}호차
        </div>
        <div
          className="openHighCars"
          onClick={handleHighCars}
          style={{ backgroundColor: highCarsColor }}
        >
          칸 이동
        </div>
      </div>

      <div className="infoBox">
      {!loading && <StationsInPath data={data} />}

      {!loading && openChance && <Chance data={data} />}

      {!loading && openHighCars && <HighCars data={data} />}
      </div>
    </div>
  );
}

export default RecommendDetail;
