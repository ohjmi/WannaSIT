import axios from 'axios';
import fs from 'fs';
import path from 'path';

const stationCodes = JSON.parse(fs.readFileSync(path.join('../', 'data', 'preprocessingData', 'stationCodes.json'), 'utf-8')); 
const dows = ['MON', 'WED', 'FRI'];
const hhs = ['08', '13'];
const appKey = "";

const makeRequest = async (stationName, stationCode, dow, hh) => {
    const url = `https://apis.openapi.sk.com/puzzle/subway/congestion/stat/get-off/stations/${stationCode}?dow=${dow}&hh=${hh}`;
    const headers = {
        'appkey': appKey,
        'Accept': 'application/json'
    };

    try {
        const response = await axios.get(url, { headers, timeout: 30000 });
        const filePath = path.join(__dirname, 'responses', 'getOffRate', `하차_${stationName}_${dow}_${hh}.json`);
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));

        const { code, message } = response.data.status;
        console.log(`응답코드: ${code}, 메시지: ${message}`);
        console.log(`역명: ${stationName}, 요일: ${dow}, 시간: ${hh} 진행중`);
    } catch (error) {
        console.error(`Error occurred while fetching data for station code ${stationCode}: `, error);
        process.exit(1); // 에러 발생 시 프로세스 종료
    }
}

const getCongestionData = async () => {
    for (const stationName in stationCodes) {
        const stationCode = stationCodes[stationName];
        for (const dow of dows) {
            for (const hh of hhs) {
                await makeRequest(stationName, stationCode, dow, hh);
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
            }
        }
    }
}

getCongestionData();
