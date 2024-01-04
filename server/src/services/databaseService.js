import mysql from "mysql2/promise";

async function getConnection() {
  return await mysql.createConnection(process.env.DATABASE_URL);
}

async function executeQuery(connection, query, params) {
  return await connection.execute(query, params);
}

async function endConnection(connection) {
  return await connection.end();
}

export { getConnection, executeQuery, endConnection };
