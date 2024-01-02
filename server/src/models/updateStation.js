import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const updateStation = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);
	const stationTipsData = JSON.parse(fs.readFileSync(path.join("../", "data", "stationTips.json")));

	try {
		await connection.beginTransaction();
		console.log(`station 테이블 transaction start`);

		for (let station of stationTipsData) {
			console.log(`${station.stationName}역 update start`);
			await connection.execute(`
				UPDATE station
				SET station_info = ?, passenger_info = ?
				WHERE id = ?`, [station.stationInfo, station.passengerInfo, station.stationId]
			);
		}
		await connection.commit();
		console.log(`station 테이블 transaction done`);
	} catch (err) {
		console.error("station 테이블 update 중 에러 발생: ", err);
		await connection.rollback();
	} finally {
		connection.end();
	}
};

export default updateStation;