import "./StationsInPath.css";
import Tips from "../Modal/CarsModal";
import { useState } from "react";
import lineCircle from "../../assets/images/circle.svg"

function StationsInPath({ data }) {
  const [openTipsIndex, setOpenTipsIndex] = useState(null);

  const handleOpenTips = (index) => {
    setOpenTipsIndex(openTipsIndex === index ? null : index);
  };


  return (
    <div className="StationsInPath">
      <div className="forHeight"></div>
      {data.map((item, index) => (
        <li className="stationList" key={item.station}>
          <div className="stationLineCircle"><img src={lineCircle} alt="동그라미" /></div>
          {item.traffic === 1 ? (
            <span className="redSpan">많이 내려요</span>
          ) : null}
          {item.station}
          {item.traffic === 1 ? (
            <span className="blueSpan" onClick={() => handleOpenTips(index)}>
              착석꿀팁 &gt;
              {openTipsIndex === index && (
                <Tips station={item.station} tip={item.tip} />
              )}
            </span>
          ) : null}
        </li>
      ))}
    </div>
  );
}

export default StationsInPath;