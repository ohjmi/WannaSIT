import React, { useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReactComponent as MapSvg } from "../../assets/images/MetroMap.svg";
import { ReactComponent as MarkerSvg } from "../../assets/images/marker.svg";

function MetroMap({ startResultClick, endResultClick }) {
  const [markerDiv, setMarkerDiv] = useState();
  const svgRef = useRef();

  const handleMapClick = (event) => {
    // 이미 생성된 마커가 있다면 제거
    setMarkerDiv(null);

    // 클릭 좌표 확인
    const clickX = event.clientX;
    const clickY = event.clientY;

    // 클릭한 좌표에 있는 요소 가져오기
    const targetPath = document.elementFromPoint(clickX, clickY);

    if (targetPath.classList.contains("station")) {
      // targetPath의 value 가져오기
      const targetStaion = targetPath.getAttribute("data-value");
      // targetPath의 위치와 크기 정보 가져오기
      const { left, top, width, height } = targetPath.getBoundingClientRect();
      // targetPath의 좌표 중앙값 계산
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // 새 SVGPoint 객체를 생성 (SVG 파일의 한 점을 나타냄)
      const svg = svgRef.current;
      const point = svg.createSVGPoint();
      // point의 좌표 = targetPath의 좌표 중앙값
      point.x = centerX;
      point.y = centerY;

      const transformedPoint = point.matrixTransform(
        svg.getScreenCTM().inverse()
      );
      // getScreenCTM() 메서드는 SVG 요소에 적용된 현재 변환 행렬(CTM)을 반환, CTM은 SVG 요소의 현재 좌표 시스템과 사용자 에이전트의 초기 좌표 시스템 간의 관계를 정의
      // inverse() 메서드는 해당 행렬의 역행렬을 반환
      // matrixTransform() 메서드는 입력 행렬에 의해 변환된 새로운 point의 복사본을 반환
      // transformedPoint는 현재 SVG 요소의 좌표 시스템에 올바르게 위치하게 됨.

      // 마커 생성
      const marker = (
        <div
          style={{
            position: "absolute",
            left: transformedPoint.x - 30,
            top: transformedPoint.y - 31.25,
          }}
        >
          <MarkerSvg
            onClick={(event) => handleMarkerClick(event, targetStaion)}
          />
        </div>
      );
      setMarkerDiv(marker);
    }
  };

  const handleMarkerClick = (event, targetStaion) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
    const targetBtn = document.elementFromPoint(clickX, clickY);

    if (targetBtn.classList.contains("start")) {
      startResultClick(eval(`"${targetStaion}"`));
      setMarkerDiv(null);
    } else if (targetBtn.classList.contains("end")) {
      endResultClick(eval(`"${targetStaion}"`));
      setMarkerDiv(null);
    }
  };

  return (
    <div>
      <TransformWrapper initialScale={1} minScale={0.9} maxScale={1.8}>
        <TransformComponent>
          <MapSvg onClick={handleMapClick} ref={svgRef} />
          {markerDiv}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default MetroMap;
