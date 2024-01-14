import WebSocket from "ws";

function setupWebSocket(app) {
  const wsClients = new Map();

  app.ws("/chat", (ws, req) => {
    const clientIP = req.socket.remoteAddress;

    const username = req.session.name;

    // ========== 다중 탭 접속, 동일 닉네임 예외 처리 필요 ==========
    console.log(`${username}(${clientIP}) 입장`);

    wsClients.set(username, ws);

    // 입장 알림 전송
    const type = "join";
    const sender = "관리자";
    const content = `${username} 님이 입장하셨습니다.`;

    const messageObj = { type, sender, content };

    wsClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(JSON.stringify(messageObj));
      }
    });
    // ====================

    ws.on("message", (message) => {
      console.log(`${username}(${clientIP}) : ${message.toString()}`);

      let parsedMessage = "";

      // 받은 문자열 파싱해서 객체화
      try {
        parsedMessage = JSON.parse(message);
      } catch (error) {
        console.error("Invalid JSON Format: ", error);
        return;
      }

      wsClients.forEach((client, clientName) => {
        if (client.readyState === WebSocket.OPEN) {
          const type = clientName === username ? "sent" : "received";
          const sender = username;
          const content = parsedMessage?.content;

          const messageObj = { type, sender, content };

          client.send(JSON.stringify(messageObj));
        }
      });
    });

    ws.on("close", () => {
      console.log(`${username}(${clientIP}) 퇴장`);

      wsClients.delete(username);

      const type = "leave";
      const sender = "관리자";
      const content = `${username} 님이 퇴장하셨습니다.`;

      const messageObj = { type, sender, content };

      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify(messageObj));
        }
      });
    });
  });
}

export default setupWebSocket;
