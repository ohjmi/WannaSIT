import "./HighCars.css";

function HighCars({ data }) {
  return (
    <div className="HighCars">
      <p>앉을 가능성이 높은 호차를 알려드려요</p>
      {data.map((item) => (
        <li className="highCarsList" key={item.station}>
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index + 1}
              className={
                item.highCars && item.highCars.includes(index + 1)
                  ? "highlighted"
                  : "unhighlighted"
              }
            />
          ))}
          <br />
          빠른 착석 | {item.highCars[0]}호차,{item.highCars[1]}호차
        </li>
      ))}
    </div>
  );
}

export default HighCars;
