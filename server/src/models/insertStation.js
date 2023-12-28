import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const insertStation = async () => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const rows = [];
  const csvFilePath = path.join("../", "data", "stationTravelTime.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const formattedRow = [
        parseInt(row.id),
        row.station_name,
        parseInt(row.prev_station_time),
        parseInt(row.next_station_time)
      ];
      rows.push(formattedRow);
    })
    .on("end", async () => {
        try {
            await connection.beginTransaction();
            console.log("station 테이블 transaction start");

            for (let row of rows)
                await connection.execute("INSERT INTO station (id, station_name, prev_station_time, next_station_time) VALUES (?, ?, ?, ?)", row);
            await connection.commit();
            console.log("station 테이블 transaction done");
        } catch (err) {
          console.error("station 테이블 insert 중 에러 발생: ", err);
          await connection.rollback();
        } finally {
          connection.end();
        }
    });
};

export default insertStation;