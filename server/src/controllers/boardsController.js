import { getConnection, executeQuery, endConnection } from "../services/databaseService.js";
import getAuthorId from "../utils/getAuthorId.js";

// 게시글 상세정보 함수
async function getPost(req, res) {
  const connection = await getConnection();
  const params = [req.params.boardID];
  const query =`
	SELECT *
	FROM post
	WHERE id = ?`

  try {
    const [rows] = await executeQuery(connection, query, params);
		const row = rows[0];
    res.status(200).json({
			"userId": row.user_id,
			"username": row.username,
			"title": row.title,
			"content": row.content,
			"creationDate": row.creation_date,
			"likeCount": row.like_count,
			"isAuthor": row.user_id === req.sessionID ? 1 : 0
		});
  } catch (err) {
    console.error("게시글 상세정보 로드 실패", err);
    res.status(404).json({ "message": "게시글 없음: 잘못된 게시글 번호입니다." });
  } finally {
    endConnection(connection);
  }
}

// 게시글 작성 함수
async function createPost(req, res) {
  const connection = await getConnection();
  const userId = req.sessionID;
  const username = req.session.name;
  const title = req.body.title;
  const content = req.body.content;
  const time = new Date();
  const params = [userId, username, title, content, time];
  const query =`
	INSERT INTO post (user_id, username, title, content, creation_date)
  VALUES (?, ?, ?, ?, ?)`

  try {
    await executeQuery(connection, query, params);
    res.status(200).json({ "message": "게시글 등록 성공" });
  } catch (err) {
    console.error("게시글 등록 실패", err);
    res.status(500).json({ "message": "서버 에러: 게시글 등록에 실패했습니다." });
  } finally {
    endConnection(connection);
  }
}

// 게시글 수정 함수
async function updatePost(req, res) {
  const authorId = await getAuthorId(req.params.boardID);

  // boardID에 해당하는 게시글이 존재하지 않는 경우
  if (!authorId) {
    res.status(404).json({ "message": "게시글 없음: 잘못된 게시글 번호입니다."});
    return;
  }

  // 본인이 작성하지 않은 게시글을 수정하려는 경우
  if (req.sessionID !== authorId) {
    res.status(403).json({ "message": "권한 없음: 게시글을 수정할 수 없습니다." });
    return;
  }

  const connection = await getConnection();
  const title = req.body.title;
  const content = req.body.content;
  const time = new Date();
  const params = [title, content, time, req.params.boardID];
  const query =`
  UPDATE post
  SET title = ?, content = ?, creation_date = ?
  WHERE id = ?`

  try {
    await executeQuery(connection, query, params);
    res.status(200).json({ "message": "게시글 수정 성공" });
  } catch (err) {
    console.error("게시글 수정 실패", err);
    res.status(500).json({ "message": "서버 에러: 게시글 수정에 실패했습니다." });
  } finally {
    endConnection(connection);
  }
}

// 게시글 삭제 함수
async function deletePost(req, res) {
  const authorId = await getAuthorId(req.params.boardID);

  // boardID에 해당하는 게시글이 존재하지 않는 경우
  if (!authorId) {
    res.status(404).json({ "message": "게시글 없음: 잘못된 게시글 번호입니다."});
    return;
  }

  // 본인이 작성하지 않은 게시글을 삭제하려는 경우
  if (req.sessionID !== authorId) {
    res.status(403).json({ "message": "권한 없음: 게시글을 삭제할 수 없습니다." });
    return;
  }

  const connection = await getConnection();
  const params = [req.params.boardID];
  const query =`
  DELETE
  FROM post
  WHERE id = ?`

  try {
    await executeQuery(connection, query, params);
    res.status(200).json({ "message": "게시글 삭제 성공" });
  } catch (err) {
    console.error("게시글 삭제 실패", err);
    res.status(500).json({ "message": "서버 에러: 게시글 삭제에 실패했습니다." });
  } finally {
    endConnection(connection);
  }
}

export default { getPost, createPost, updatePost, deletePost };