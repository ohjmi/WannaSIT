const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(morgan("dev"));

const corsOptions = {
  origin: "http://127.0.0.1:3000", // 허용할 클라이언트 주소
};
app.use(cors(corsOptions));

const data = [
  "시청",
  "을지로입구",
  "을지로3가",
  "을지로4가",
  "동대문역사문화공원",
  "신당",
  "한양대",
  "뚝섬",
  "건대입구",
  "구의",
  "강변",
  "잠실나루",
  "잠실",
  "신천",
  "종합운동장",
  "삼성",
  "선릉",
  "역삼",
  "강남",
  "교대",
  "서초",
  "방배",
  "사당",
  "낙성대",
  "서울대입구",
  "미아사거리",
  "미아",
  "길음",
  "성신여대입구",
  "한성대입구",
  "혜화",
  "동대문",
  "충무로",
  "회현",
  "남산",
  "숙대입구",
  "서울역",
  "신당",
  "상왕십리",
  "왕십리",
  "한양대",
  "뚝섬",
  "성수",
  "노원",
  "창동",
];

app.get("/stations", (req, res) => {
  // res.json({ message: 'Hello From Express Server'});
  console.log('데이터 전송');
  res.json(data);
});

app.listen(port, () => {
  console.log(`서버 포트 : ${port}번`);
});
