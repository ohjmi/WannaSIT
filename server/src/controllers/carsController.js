import { getRouteAndDirection, getRouteDetail } from "../services/routeService.js";
import { calculateRanking, calculateChanceByCount } from "../services/carService.js";

// 추천 호차 랭킹
async function rank(req, res) {
  try {
    const { startStation, endStation } = req.query;
    const { route, direction } = await getRouteAndDirection(startStation, endStation);
    const routeDetail = await getRouteDetail(route, direction);
    const carRank = calculateRanking(routeDetail);

    res.send(carRank);
  } catch (error) {
    console.error("Error in rank function:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function info(req, res) {
  const { startStation, endStation, carNumber } = req.query;
  const { route, direction } = await getRouteAndDirection(startStation, endStation);
  const routeDetail = await getRouteDetail(route, direction);
  const chanceByRoute = calculateChanceByCount(routeDetail, carNumber);

  const result = [];

  routeDetail.forEach((route, index) => {
    const { station_name, station_info, passenger_info } = route[0];

    const station = station_name;
    const traffic = Math.floor(Math.random() * 2); // 상민 오빠한테 받을 데이터
    const feature = station_info;
    const character = passenger_info;
    const tip = { feature, character };
    const chance = chanceByRoute[index];
    const highCars = [2, 3]; // 상민 오빠한테 받을 데이터

    const data = { station, traffic, tip, chance, highCars };
    result.push(data);
  });

  res.send(result);
}

export default { rank, info };
