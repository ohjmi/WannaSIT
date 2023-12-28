import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const createTable = async () => {
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const sqlFile = fs.readFileSync(path.join("./", "create_tables.sql"), "utf-8");
const queries = sqlFile.split(";");

for (let query of queries) {
	query = query.trim();
	if (query) {
		try {
			await connection.execute(query);
			console.log("쿼리 실행 성공");
		} catch (err) {
			console.error("쿼리 실행 실패: ", err);
		}
	}
}
await connection.end()
};

createTable();