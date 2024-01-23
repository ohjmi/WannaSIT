import "./Chance.css";


function Chance({ data }) {
  return (
    <div className="Chance">
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
          {Array.from({ length: 25 }, () => (
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