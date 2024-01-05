// 랭킹 계산 함수
function calculateRanking(routeDetail) {
  const countByCar = gatherCountByCar(routeDetail);
  const minCountByCar = findMinCountByCar(countByCar);

  // 우선순위 : minCount  > index(역)
  sortArray(minCountByCar);

  const carRank = transformForCarResponse(minCountByCar);
  return carRank;
}

// 착석 가능성 분류 함수 // 상수
function calculateChanceByCount(routeDetail, carNumber) {
  const countByCar = gatherCountByCar(routeDetail);
  const countCar = countByCar[carNumber - 1];

  countCar.map((car, index) => {
    countCar[index] = car < 54 ? "높음" : car <= 64 ? "중간" : "낮음";
  });

  return countCar;
}

// 경로까지 칸 별 예측 인원 모으는 함수
function gatherCountByCar(routeData) {
  return Array.from({ length: routeData[0].length }, (_, index) => routeData.map((station) => station[index].estimated_count));
}

// 칸 별 착석 가능성 높은 역 찾기
function findMinCountByCar(countByCar) {
  const minCountByCar = [];

  countByCar.forEach((car, index) => {
    let carNum = index + 1;
    let minCount = Math.min(...car);
    let stationIndex = car.indexOf(minCount);

    minCountByCar.push({ carNum, stationIndex, minCount });
  });

  return minCountByCar;
}

function sortArray(array) {
  console.log(array);
  array.sort((a, b) => {
    // 출발역에서 앉을 수 있다면 0순위
    if (a.stationIndex === 0 && a.minCount <= 34) {
      return -1;
    } else {
      if (a.minCount === b.minCount) {
        return a.stationIndex - b.stationIndex;
      }
      return a.minCount - b.minCount;
    }
  });
  console.log(array);
}

function transformForCarResponse(minCountByCar) {
  return minCountByCar.map(({ carNum, stationIndex, minCount }) => {
    const isSeatAvailable = minCount <= 34 ? 1 : 0;
    return {
      carNum,
      stationIndex,
      isSeatAvailable,
    };
  });
}

export { calculateRanking, calculateChanceByCount };
