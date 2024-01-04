import { getRouteAndDirection, getRouteDetail } from "../services/routeService.js";
import { calculateRanking } from "../services/carService.js";

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

export default { rank };
