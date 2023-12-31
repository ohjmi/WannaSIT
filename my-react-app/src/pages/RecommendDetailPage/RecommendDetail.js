import "./RecommendDetail.css";
import StationPath from "../../components/StationPath/StationPath";
import { useLocation } from 'react-router-dom';
import greenCircle from "../../assets/images/icon/greenCircle.svg"
import yellowCircle from "../../assets/images/icon/yellowCircle.svg"
import redCircle from "../../assets/images/icon/redCircle.svg"

function RecommendDetail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const startStation = query.get('startStation');
  // const endStation = query.get('endStation');
  const carNumber = query.get('carNumber');

  return (
    <div className="RecommendDetail">
      <StationPath />
      <div className="carSelectOpt">
        <button>{carNumber}</button>
        <button>칸 이동</button>
      </div>
      <div className="carSelected">
        <p>앉을 가능성을 알려드려요<img src={greenCircle} alt="초록원" /><img src={yellowCircle} alt="노란원" /><img src={redCircle} alt="빨간원" /></p>
      </div>
      <div className="allStationInPath"></div>
      <div className="chanceOfCar"></div>
      <div></div>
    </div>
  );
}

export default RecommendDetail;
