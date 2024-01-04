import { readJsonFileValues } from "../utils/fileUtils.js";
import path from "path";

const __dirname = path.resolve();

// 전체 역 리스트 가져오는 함수
async function getStations() {
  const filePath = path.join(__dirname, "src", "data", "stationCodes.json");

  try {
    const stations = await readJsonFileValues(filePath);
    return stations;
  } catch (error) {
    console.error("역 목록 읽기 실패: ", error);
    throw error;
  }
}

export { getStations };
