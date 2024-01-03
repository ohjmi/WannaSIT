import { getRouteDetail } from "../services/routeService.js";

// 추천 호차 랭킹
async function rank(req, res) {
  try {
    const { startStation, endStation } = req.query;
    const result = await getRouteDetail(startStation, endStation);

    // 결과값: 경로, 상하행, 요일, 시간, 분 대에 따른 역 별, 칸 별 데이터
    console.log(result);
    // ======================================================================

    res.send("ㅋ");
  } catch (error) {
    console.error("Error in rank function:", error);
    res.status(500).send("Internal Server Error");
  }
}

export default { rank };
