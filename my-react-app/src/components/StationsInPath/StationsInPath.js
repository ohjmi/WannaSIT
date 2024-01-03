import "./StationsInPath.css";
import Tips from "../../components/Tips/Tips";
import { useState } from "react";

function StationsInPath({ data }) {
  const [openTipsIndex, setOpenTipsIndex] = useState(null);

  const handleOpenTips = (index) => {
    setOpenTipsIndex(openTipsIndex === index ? null : index);
  };

  return (
    <div className="StationsInPath">
      {data.map((item, index) => (
        <li className="stationList" key={item.station}>
          {item.traffic === 1 ? (
            <span className="redSpan">많이 내려요</span>
          ) : null}
          {item.station}
          {item.traffic === 1 ? (
            <span className="blueSpan" onClick={() => handleOpenTips(index)}>
              착석꿀팁 &gt;
              {openTipsIndex === index && (
                <Tips station={item.station} tip={item.tip[0]} />
              )}
            </span>
          ) : null}
        </li>
      ))}
    </div>
  );
}

export default StationsInPath;
