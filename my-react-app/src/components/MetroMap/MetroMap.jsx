import React, { useRef, useEffect } from "react";
import "./MetroMap.css";
import Map from "../../assets/images/MetroMap.svg";
import marker from "../../assets/images/marker.svg";

function MetroMap({ startResultClick, endResultClick }) {
  const mapCanvasRef = useRef(null);
  const markerCanvasRef = useRef(null);
  const dpr = window.devicePixelRatio;

  useEffect(() => {
    const mapCanvas = mapCanvasRef.current;
    const markerCanvas = markerCanvasRef.current;
    const mapCtx = mapCanvas.getContext("2d");

    // 지도 이미지 로드
    const mapImage = new Image();
    mapImage.src = Map;

    mapImage.onload = () => {
      mapCanvas.width = mapImage.width * dpr;
      mapCanvas.height = mapImage.height * dpr;
      markerCanvas.width = mapImage.width * dpr;
      markerCanvas.height = mapImage.height * dpr;
      mapCtx.scale(dpr, dpr);
      mapCtx.drawImage(mapImage, 0, 0, mapImage.width, mapImage.height);
    };
  }, []);

  // 클릭 이벤트 핸들러
  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    console.log(offsetX, offsetY)

    // 좌표에 해당하는 값 매핑
    const locationValue = getLocationValue(offsetX, offsetY);

    // 마커 이미지 그리기
    if(locationValue){drawMarker(locationValue.staion, locationValue.staionX - 60, locationValue.staionY - 69)};
  };

  // 좌표에 해당하는 값 매핑하는 함수 (임의로 예시로 신촌만 매핑)
  const getLocationValue = (x, y) => {
    if (x >= 169 && x <= 209 && y >= 307 && y <= 347) {
      return {staion : "신촌", staionX : 189, staionY : 327};
    }
  };

  // 마커 이미지 그리는 함수
  const drawMarker = (locationValue, x, y) => {
    const markerCtx = markerCanvasRef.current.getContext("2d");
    const markerImage = new Image();
    markerImage.src = marker;

    markerImage.onload = () => {
      markerCtx.clearRect(
        0,
        0,
        markerCanvasRef.current.width,
        markerCanvasRef.current.height
      );
      markerCtx.drawImage(markerImage, x, y, markerImage.width, markerImage.height); // 마커 크기 및 위치 조절 가능
    };
  };

  return (
    <div className="MetroMap" onClick={handleMapClick}>
      <canvas ref={mapCanvasRef}></canvas>
      <canvas ref={markerCanvasRef}></canvas>
    </div>
  );
}

export default MetroMap;
