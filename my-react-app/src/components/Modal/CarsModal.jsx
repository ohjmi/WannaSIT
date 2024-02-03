import "./CarsModal.css";
import { useEffect, useState } from "react";

function Tips({ station, tip }) {
  const [tipImage, setTipImage] = useState();
  const images = require.context("../../assets/images/tipImage", true);
  let imagePath = (name) => images("./" + name);

  useEffect(() => {
    if (tip.feature === "주거 지역") {
      setTipImage(imagePath("street.svg"));
    } else if (tip.feature === "정부청사 지역") {
      setTipImage(imagePath("company.svg"));
    } else if (
      tip.feature === "상가, 회사 밀집 지역" ||
      tip.feature === "정부청사, 상가 밀집 지역"
    ) {
      setTipImage(imagePath("city.svg"));
    } else if (tip.feature === "회사 밀집 지역") {
      setTipImage(imagePath("city.svg"));
    } else if (tip.feature === "관광지") {
      setTipImage(imagePath("city.svg"));
    } else if (
      tip.feature === "대학가" ||
      tip.feature === "MZ 문화 상권" ||
      tip.feature === "대학가, MZ 문화 상권, 관광지"
    ) {
      setTipImage(imagePath("students.svg"));
    } else if (tip.feature === "성수동 카페거리, 서울숲 인근") {
      setTipImage(imagePath("casual.svg"));
    } else if (tip.feature === "패션의 성지") {
      setTipImage(imagePath("casual.svg"));
    } else if (tip.feature === "동서울 버스 터미널 인근") {
      setTipImage(imagePath("terminal.jpg"));
    } else if (tip.feature === "롯데월드, 롯데타워 인근") {
      setTipImage(imagePath("amusementPark.svg"));
    } else if (tip.feature === "스포츠 단지") {
      setTipImage(imagePath("sports.svg"));
    } else if (tip.feature === "강남 중심업무지구, 서울 최대 상권") {
      setTipImage(imagePath("city.svg"));
    } else if (tip.feature === "대법원 인근") {
      setTipImage(imagePath("court.jpg"));
    } else if (
      tip.feature === "상가 밀집 지역" ||
      tip.feature === "상가 밀집 지역, 차이나타운 인근"
    ) {
      setTipImage(imagePath("street.svg"));
    } else if (tip.feature === "가장 환승객이 많은 역") {
      setTipImage(imagePath("station.svg"));
    }
  }, [tip]);

  return (
    <div className="Tips">
      <div className="tipBox">
        <p id="tipText">
          {station}역 [{tip.feature}]
        </p>
        <img src={tipImage} alt="꿀팁이미지" className="tipImage" />
        <p id="tipDetail">
          <span>{tip.character} </span>을(를)<hr></hr>보고 앞에 서면 앉을 가능성이 높아요!
        </p>
        <div className="greenButton">닫기</div>
      </div>
    </div>
  );
}

export default Tips;
