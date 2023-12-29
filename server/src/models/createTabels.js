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
				console.log("테이블 생성 성공");
			} catch (err) {
				console.error("테이블 생성 실패: ", err);
				connection.end();
				throw err;
			}
		}
	}
	
	connection.end();
};

export default createTable;