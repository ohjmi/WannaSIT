import "./Chance.css";
import greenCircle from "../../assets/images/icon/greenCircle.svg";
import yellowCircle from "../../assets/images/icon/yellowCircle.svg";
import redCircle from "../../assets/images/icon/redCircle.svg";

function Chance({ data }) {
  return (
    <div className="Chance">
      <p>
        앉을 가능성을 알려드려요
        <img src={greenCircle} alt="초록원" />
        <img src={yellowCircle} alt="노란원" />
        <img src={redCircle} alt="빨간원" />
      </p>
      {data.map((item) => (
        <li
          className="chanceList"
          key={item.station}
          style={{
            color:
              item.chance === "높음"
                ? "#7ED287"
                : item.chance === "중간"
                ? "#FABE00"
                : item.chance === "낮음"
                ? "#F21111"
                : null,
          }}
        >
          {Array.from({ length: 30 }, () => (
            <div className="line" />
          ))}
          <div className="circle" />
          {item.chance}
        </li>
      ))}
    </div>
  );
}

export default Chance;
