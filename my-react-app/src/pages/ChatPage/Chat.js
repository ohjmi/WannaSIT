import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket"; //웹소켓 라이브러리
import "./Chat.css";
import Hamburger from "../../components/Hamburger/Hamburger";
import ChatSendBtn from "../../assets/images/icon/ChatSendBtn.svg";

function Chat() {
  const [socketUrl] = useState("ws://localhost:4000/chat");
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState([]); //웹소켓에서 메시지를 받으면 호출되는 상태

  //메시지를 보내기 위한 기능
  const [message, setMessage] = useState("");
  const onMessage = (event) => setMessage(event.target.value);
  const sendMsg = () => {
    if (message.trim() !== "") {
      const msg = {
        content: message,
      };
      sendMessage(JSON.stringify(msg));
      setMessage("");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      sendMsg();
      event.preventDefault(); // 엔터키에 의한 줄바꿈 방지
    }
  };

  const scrollContainerRef = React.createRef(); // 스크롤 컨테이너의 ref

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => {
        // console.log(lastMessage);
        let msg = lastMessage ? lastMessage.data : null;
        if (msg) {
          console.log(lastMessage);
          let object = JSON.parse(msg);
          lastMessage.sender = object.sender;
          lastMessage.content = object.content;
          lastMessage.messagetype = object.type;
          console.log("확인:", lastMessage.messagetype);
        }
        return prev.concat(lastMessage);
      });
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    // 새로운 메시지가 도착할 때마다 스크롤을 맨 아래로 이동
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [lastMessage, scrollContainerRef]);

  return (
    <div className="Chat">
      <Hamburger />
      <div id="messageContainer" ref={scrollContainerRef}>
        <ul className="messageList">
          {messageHistory.map((message, idx) => {
            if (message.messagetype === "received") {
              return (
                <>
                  <div className="sender">{message.sender}</div>
                  <div key={idx} className="messageBubble receivedMessage">
                    {message.content}
                  </div>
                </>
              );
            } else if (message.messagetype === "sent") {
              return (
                <>
                <div className="username">{message.sender}</div>
                <div key={idx} className="messageBubble sentMessage">
                  {message.content}
                </div>
                </>
              );
            } else {
              return (
                <div key={idx} className="userInOut">
                  {message.content}
                </div>
              );
            }
          })}
        </ul>
      </div>
      <div className="inputForm">
        <input
          type="text"
          id="inputMessage"
          value={message}
          onChange={onMessage}
          onKeyUp={handleKeyUp}
          placeholder="메세지를 입력하세요"
        />
        <img src={ChatSendBtn} alt="전송" id="sendButton" onClick={sendMsg} />
      </div>
    </div>
  );
}

export default Chat;
