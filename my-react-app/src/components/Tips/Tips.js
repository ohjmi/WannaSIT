import "./Tips.css";

function Tips({ station, tip }) {
  return (
    <div className="Tips">
      <div className="tipBox">
        <img />
        <p id="tipText">
          {station}역은 {tip.feature}입니다.
        </p>
        <p id="tipDetail">{tip.character}이 많이 내려요. (특징)을 보고 앞에 서면 앉을 가능성이 높아요!</p>
        <div className="greenButton">닫기</div>
      </div>
    </div>
  );
}

export default Tips;
