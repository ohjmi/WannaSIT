import { getConnection, executeQuery, endConnection } from "../services/databaseService.js";

async function getAuthorId(table, id) {
  const connection = await getConnection();
  const params = [id];
  const query = `SELECT user_id FROM ${table} WHERE id = ?`;

  try {
    const [rows, fields] = await executeQuery(connection, query, params);
    return rows[0].user_id;
  } catch (err) {
    console.error("작성자 ID 조회 실패", err);
    return false;
  } finally {
    endConnection(connection);
  }
}

export default getAuthorId;
