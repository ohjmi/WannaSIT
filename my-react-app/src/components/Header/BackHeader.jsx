import "./BackHeader.css";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/icon/backArrow.svg";
import logo from "../../assets/images/logo.svg";

function BackHeader() {
  const navigate = useNavigate();


  return (
    <div className="BackHeader">
      <div className="backCont">
        <div className="backWrap">
          <img src={BackArrow} alt="뒤로가기 버튼" onClick={() => navigate(-1)} />
        </div>
        <div className="logoWrap">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default BackHeader;