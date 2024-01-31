import React, { useRef, useEffect, useState } from "react";
import "./MetroMap.css";
import Map from "../../assets/images/metroMap.svg";
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
      mapCanvas.height = mapImage.height * dpr * 1.05;
      markerCanvas.width = mapImage.width * dpr;
      markerCanvas.height = mapImage.height * dpr * 1.05;
      mapCtx.scale(dpr, dpr);
      mapCtx.drawImage(mapImage, 0, 20, mapImage.width, mapImage.height);
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
        locationValue.stationY - 60
      );
    }
  };

  const stationCoordinates = {
    을지로입구: [356, 80],
    시청: [269, 80],
    충정로: [189, 176],
    아현: [189, 236],
    이대: [189, 296],
    신촌: [189, 357],
    홍대입구: [189, 417],
    합정: [189, 478],
    당산: [189, 538],
    영등포구청: [189, 599],
    문래: [189, 661],
    신도림: [189, 722],
    대림: [189, 781],
    구로디지털단지: [189, 844],
    신대방: [189, 902],
    신림: [189, 961],
    봉천: [189, 1024],
    서울대입구: [189, 1083],
    낙성대: [189, 1144],
    사당: [189, 1205],
    방배: [189, 1265],
    서초: [260, 1357],
    교대: [362, 1357],
    을지로3가: [425, 132],
    을지로4가: [425, 192],
    동대문역사문화공원: [425, 252],
    신당: [425, 312],
    상왕십리: [425, 369],
    왕십리: [425, 428],
    한양대: [425, 487],
    뚝섬: [425, 547],
    성수: [425, 607],
    건대입구: [425, 664],
    구의: [425, 723],
    강변: [425, 783],
    잠실나루: [425, 842],
    잠실: [425, 902],
    잠실새내: [425, 961],
    종합운동장: [425, 1021],
    삼성: [425, 1080],
    선릉: [425, 1139],
    역삼: [425, 1199],
    강남: [425, 1258],
  };

  const getLocationValue = (x, y) => {
    for (const station in stationCoordinates) {
      const [stationX, stationY] = stationCoordinates[station];
      if (
        x >= stationX - 20 &&
        x <= stationX + 20 &&
        y >= stationY - 20 &&
        y <= stationY + 20
      ) {
        console.log(`${station} 데이터 준비 완료`);
        return {
          station: station,
          stationX: stationX,
          stationY: stationY,
        };
      }
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
