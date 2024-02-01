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
              item.chance >= 70
                ? "#7ED287"
                : item.chance < 70 && item.chance >= 30
                ? "#FABE00"
                : item.chance < 30
                ? "#F21111"
                : null,
          }}
        >
          {Array.from({ length: 25 }, () => (
            <div className="line" />
          ))}
          <div className="circle" />
          {item.chance}%
        </li>
      ))}
    </div>
  );
}

export default Chance;
