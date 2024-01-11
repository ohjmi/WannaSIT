import { getConnection, executeQuery, endConnection } from "../services/databaseService.js";

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

// 많이 내리는 역 여부 체크 함수
async function determineHighTraffic(routeDetail) {
	const traffic = [];
	const connection = await getConnection();
	const query =`
	SELECT get_off_count 
	FROM train 
	WHERE direction=0 AND arrival_day=? AND arrival_hour=? AND arrival_min=0 
	ORDER BY get_off_count DESC 
	LIMIT 1 OFFSET 14;`

	await Promise.all(routeDetail.map(async (route) => {
		const params = [route[0].arrival_day, route[0].arrival_hour];
		const [rows, fields] = await executeQuery(connection, query, params);
		const getOffThreshold = rows[0].get_off_count;	// 해당 시간대 상위 15등에 해당하는 값

		if (route[0].get_off_count >= getOffThreshold)
			traffic.push(1);
		else
			traffic.push(0);
	}));

	connection.end();
	return (traffic);
}

// 예측인원수 가장 적은 2개의 칸 구하는 함수
function findHighCars(routeDetail) {
	const highCars = [];
	const countByCar = gatherCountByCar(routeDetail);

	for(let i = 0; i < countByCar[0].length; i++) {
		const tempArr = countByCar.map((val) => val[i]);
		const minCar = tempArr.indexOf(Math.min(...tempArr)) + 1;
		tempArr[minCar - 1] = Infinity;
		const secondMinCar = tempArr.indexOf(Math.min(...tempArr)) + 1;

		highCars.push([minCar, secondMinCar]);
	}

	return (highCars);
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

export { calculateRanking, calculateChanceByCount, determineHighTraffic, findHighCars};
