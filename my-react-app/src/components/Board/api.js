import axios from "axios";

// 외부로 요청하는 인터페이스
const instance = axios.create({
  baseURL: "http://localhost:4000", // 환경변수로부터도 읽어올 수 있음... (ex. .env / REACT_APP 시작한 것만 불러옴)
  timeout: 10000, // 요청 이후 언제까지 기다릴건지
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
