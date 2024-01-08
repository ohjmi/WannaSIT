const express = require("express");
const expressWs = require("express-ws");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:3000", // 허용할 클라이언트 주소
};
app.use(cors(corsOptions));

const carFilePath = path.join(__dirname, "public", "rankData.json");
const testFilePath = path.join(__dirname, "public", "testData.json");

app.use(express.static(path.join(__dirname, "public")));

expressWs(app);
const wsClients = new Map();
const activeClients = new Set();

app.ws("/chat", (ws, req) => {
  const username = req.query.username; // 사용자 이름을 쿼리에서 가져오기
  console.log("클라이언트 접속:", username);

  // 연결된 이후 내부 메세지를 처리하는 부분
  ws.on("message", (message) => {
    let parsedMessage = JSON.parse(message);
    let messageType;


  if (!activeClients.has(username)) {
    activeClients.add(username);

    // 모든 클라이언트에게 입장 알림 전송
    const joinNotification = {
      type: "join",
      sender: "시스템 알림",
      content: `${username} 님이 입장하셨습니다.`,
    };

    wsClients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(joinNotification));
      }
    });
  }

    // 받은 문자열을 파싱해서 객체 형태로 만듦
    try {
      parsedMessage = JSON.parse(message);
      messageType = parsedMessage.type;
      console.log(parsedMessage);
    } catch {
      console.error();
    }

    // 세션ID를 저장한적이 없으면 저장하기
    if (username && !wsClients.has(username)) {
      wsClients.set(username, ws);
    }

    // 모든 클라이언트에게 그대로 전송
    if (messageType !== "join") {
      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          const messageType = client === ws ? "sent" : "received";
          const messageObj = {
            type: messageType,
            sender: username,
            content: parsedMessage.content,
          };
          client.send(JSON.stringify(messageObj));
        }
      });
    }
  });

  // 연결된 이후, 연결 종료를 처리하는 부분
  ws.on("close", () => {
    console.log("클라이언트 접속 종료");
    activeClients.delete(username);
     // 모든 클라이언트에게 퇴장 알림 전송
     const leaveNotification = {
      type: "leave",
      sender: "시스템 알림",
      content: `${username} 님이 퇴장하셨습니다.`,
    };

    wsClients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(leaveNotification));
      }
    });
  });
  });

app.get("/cars", (req, res) => {
  // JSON 파일을 읽고 파싱하여 클라이언트에게 전송
  fs.readFile(carFilePath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      try {
        const data = JSON.parse(jsonData);
        console.log(data);
        res.json(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

app.get("/cars/info", (req, res) => {
  // JSON 파일을 읽고 파싱하여 클라이언트에게 전송
  fs.readFile(testFilePath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      try {
        const data = JSON.parse(jsonData);
        console.log(data);
        res.json(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

app.listen(port, () => {
  console.log(`서버 포트 : ${port}번`);
});
