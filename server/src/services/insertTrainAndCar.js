import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import getKeyByValue from "../utils/getKeyByValue.js";

const insertTrainAndCar = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);
	const preprocessedData = JSON.parse(fs.readFileSync(path.join("../", "data", "preprocessingResult.json")));
	const stationList = JSON.parse(fs.readFileSync(path.join("../", "data", "stationCodes.json")));

	for (let station of preprocessedData.data) {
		try {
			await connection.beginTransaction();
			console.log(`station 테이블 ${station.stationName}역 transaction start`);

			for (let train of station.train) {
				const [trainId] = await connection.execute(`
          INSERT INTO train (station_id, direction, arrival_day, arrival_hour, arrival_min, get_off_count)
          VALUES (?, ?, ?, ?, ?, ?)`, [getKeyByValue(stationList, station.stationName), train.updnLine, train.dow, train.hh, train.mm, train.getOffCount]
				);

				for (let i = 0; i < 10; i++) {
					await connection.execute(`
          INSERT INTO car (train_id, estimated_count) VALUES (?, ?)`, [trainId.insertId, train.estimatedCount[i]]
					);
				}
			}

			await connection.commit();
			console.log(`station 테이블 ${station.stationName}역 transaction done`);
		} catch (err) {
			console.error("train, car 테이블 insert 중 에러 발생: ", err);
			await connection.rollback();
		} finally {
			connection.end();
		}
	}
};

export default insertTrainAndCar;