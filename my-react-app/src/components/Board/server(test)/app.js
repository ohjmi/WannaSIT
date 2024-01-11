const express = require("express");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 클라이언트 주소
};
app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, 'public')));

const data = [];

for (let i = 1; i <= 50; i++) {
  const post = {
    id: i,
    name: `익명의 사용자${i}`,
    title: `게시판 제목 ${i}`,
    content: `게시판 내용 ${i}`,
  };

  data.push(post);
}

app.get('/boards', (req, res) => {
  res.json(data);
});


app.get('/boards/:boardId', (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);

  if (isNaN(boardId) || boardId <= 0 || boardId > data.length) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  const board = data.find(post => post.id === boardId);

  if (!board) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  res.json(board);
});


app.patch('/boards/:boardId', (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);

  if (isNaN(boardId) || boardId <= 0 || boardId > data.length) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  // 해당하는 게시글 수정
  const indexToUpdate = data.findIndex(post => post.id === boardId);
  data[indexToUpdate] = {
    ...data[indexToUpdate],
    ...req.body, // 새로운 데이터로 업데이트
  };

  res.json({ success: true, updatedData: data[indexToUpdate] });
});

app.delete('/boards/:boardId', (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);

  if (isNaN(boardId) || boardId <= 0 || boardId > data.length) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  // 해당하는 게시글 삭제
  const indexToDelete = data.findIndex(post => post.id === boardId);
  data.splice(indexToDelete, 1);

  res.json({ success: true });
});

// let data = [];

// app.post('/boards', (req, res) => {
//   console.log('요청옴')
//   const { title, content } = req.body;
//   data.push({title, content})
//   console.log(data)


//   // 여기에서 게시글 등록 처리를 수행
//   console.log(`새로운 게시글 등록 - 제목: ${title}, 내용: ${content}`);


//   res.status(201).json({ message: '게시글이 성공적으로 등록되었습니다.' });

// });

// app.get('/boards', (req, res) => {
//   res.json(data);
// });




app.listen(port, () => {
  console.log(`서버 포트 : ${port}번`);
});