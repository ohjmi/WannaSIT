import React, { useRef, useEffect, useState } from "react";
import "./MetroMap.css";
import Map from "../../assets/images/MetroMap.svg";
import marker from "../../assets/images/marker.svg";

function MetroMap({ startResultClick, endResultClick }) {
  const mapCanvasRef = useRef(null);
  const markerCanvasRef = useRef(null);
  const dpr = window.devicePixelRatio;
  const [isMarkerTrue, setIsMarkerTrue] = useState(false);
  const [locationValue, setLocationValue] = useState(false);

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
    console.log("클릭위치", offsetX, offsetY);
    const locationValue = getLocationValue(offsetX, offsetY);

    if (isMarkerTrue) {
      markerClickEvent(offsetX, offsetY);
    } else if (locationValue) {
      setLocationValue(locationValue);
      drawMarker(
        locationValue.station,
        locationValue.stationX - 61,
        locationValue.stationY - 70
      );
    }
  };

  // 좌표에 해당하는 값 매핑하는 함수 (임의로 예시로 신촌만 매핑)
  const getLocationValue = (x, y) => {
    if (x >= 169 && x <= 209 && y >= 307 && y <= 347) {
      console.log("역 데이터 준비 완료");
      return {
        station: "신촌",
        stationX: 189,
        stationY: 327,
      };
    }
  };

  // 마커 이미지 그리는 함수
  const drawMarker = (locationValue, x, y) => {
    const markerCtx = markerCanvasRef.current.getContext("2d");
    const markerImage = new Image();
    markerImage.src = marker;
    console.log("마커생성");

    markerImage.onload = () => {
      markerCtx.drawImage(
        markerImage,
        x,
        y,
        markerImage.width,
        markerImage.height
      );
      setIsMarkerTrue(true);
    };
  };

  // 마커 이미지를 지우는 함수
  const clearMarker = () => {
    const markerCanvas = markerCanvasRef.current;
    const markerCtx = markerCanvas.getContext("2d");
    markerCtx.clearRect(0, 0, markerCanvas.width, markerCanvas.height);
    setIsMarkerTrue(false);
    setLocationValue(false);
    console.log("마커제거");
  };

  const markerClickEvent = (offsetX, offsetY) => {
    console.log(locationValue);
    if (
      locationValue &&
      offsetX >= locationValue.stationX - 58 &&
      offsetX <= locationValue.stationX - 4 &&
      offsetY >= locationValue.stationY - 56 &&
      offsetY <= locationValue.stationY - 10
    ) {
      startResultClick(locationValue.station);
      clearMarker();
    } else if (
      locationValue &&
      offsetX <= locationValue.stationX + 58 &&
      offsetX >= locationValue.stationX + 4 &&
      offsetY >= locationValue.stationY - 56 &&
      offsetY <= locationValue.stationY - 10
    ) {
      endResultClick(locationValue.station);
      clearMarker();
    } else {
      clearMarker();
    }
  };

  return (
    <div className="MetroMap" onClick={handleMapClick}>
      <canvas ref={mapCanvasRef}></canvas>
      <canvas ref={markerCanvasRef}></canvas>
    </div>
  );
}

export default MetroMap;
