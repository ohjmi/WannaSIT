import { getStations, getDirectionAndRoute } from "../services/carsService.js";
import path from "path";

import "dotenv/config";
import mysql from "mysql2/promise";

const __dirname = path.resolve();

// 추천 호차 랭킹
async function rank(req, res) {
  const { startStation, endStation } = req.query;

  // ======================================================================
  // 경로에 따른 데이터 DB에서 가져오기 함수화 => 결과값으로 랭킹
  const stations = getStations(path.join(__dirname, "src", "data", "stationCodes.json"));
  const { direction, route } = getDirectionAndRoute(startStation, endStation, stations);

  const date = new Date();

  // DB에 요일을 0-6으로 넣는 건 어떨지?
  const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayIndex = date.getDay();
  const day = dow[dayIndex];

  const arrivalHour = date.getHours();
  const arrivalMin = date.getMinutes();
  let calculateMin = arrivalMin; // 계산 돌릴 변수
  let calculateArrivalMin = Math.trunc(calculateMin / 10) * 10; // 분 대, 함수화해도 좋을 듯

  const routeInfo = [];

  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  for (const station of route) {
    // 월, 수, 금 데이터여서 임시로 "MON" 넣음 => 원래는 day 넣으면 됨
    // 8시 13시 데이터여서 임시로 8 넣음 => 원래는 hour 넣으면 됨

    // 전체 select 해오는 함수 + 그 중 역, 방향, 요일, 시간 계산
    const [rows, fields] = await connection.execute(
      `SELECT * FROM station s JOIN train t ON s.id = t.station_id JOIN car c ON t.id = c.train_id WHERE s.station_name = ? AND t.direction = ? AND t.arrival_day = ? AND t.arrival_hour = ? AND t.arrival_min = ?`,
      [station, direction, "MON", 8, calculateArrivalMin]
    );

    // 필터링된 결과 train 값 push
    routeInfo.push(rows);

    // 시간 계산 함수화
    // 시간 대 달라지지 않으면(현재 8시, 13시 데이터밖에 없기 때문..)
    if (calculateMin / 10 <= 5) {
      if (direction) {
        // 내선 next_station_time / 60 => 분
        calculateMin += rows[0].next_station_time / 60;
      } else {
        // 외선 prev_station_time
        calculateMin += rows[0].prev_station_time / 60;
      }
      // 분 대 달라지면서 시간 대 달라지지 않으면 +10
      calculateArrivalMin = Math.trunc(calculateMin / 10) * 10;
    }
  }

  // 결과값: 경로, 상하행, 요일, 시간, 분 대에 따른 역 별, 칸 별 데이터
  console.log(routeInfo);
  // ======================================================================

  res.send("ㅋ");
}

export default { rank };
