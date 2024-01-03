const express = require("express");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors'); 

const app = express();
const port = 4000;

app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 클라이언트 주소
};
app.use(cors(corsOptions));

const carFilePath = path.join(__dirname, 'public', 'rankData.json');
const testFilePath = path.join(__dirname, 'public', 'testData.json');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/cars', (req, res) => {
  // JSON 파일을 읽고 파싱하여 클라이언트에게 전송
  fs.readFile(carFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      try {
        const data = JSON.parse(jsonData);
        console.log(data);
        res.json(data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

app.get('/cars/info', (req, res) => {
  // JSON 파일을 읽고 파싱하여 클라이언트에게 전송
  fs.readFile(testFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      try {
        const data = JSON.parse(jsonData);
        console.log(data);
        res.json(data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});



app.listen(port, () => {
  console.log(`서버 포트 : ${port}번`);
});