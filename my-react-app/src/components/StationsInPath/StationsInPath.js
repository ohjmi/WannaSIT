import "./StationsInPath.css";

function StationsInPath({ data }) {
  return (
    <div className="StationsInPath">
      {data.map((item) => (
        <li className="stationList" key={item.station}>
          {item.traffic === 1 ? <span className="redSpan">많이 내려요</span> : null}
          {item.station}
          {item.traffic === 1 ? <span className="blueSpan">착석꿀팁 &gt;</span> : null}
        </li>
      ))}
    </div>
  );
}

export default StationsInPath;
