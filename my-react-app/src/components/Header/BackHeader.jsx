import "./BackHeader.css";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/icon/BackArrow.svg";
import logo from "../../assets/images/logo.svg";

function BackHeader() {
  const navigate = useNavigate();


  return (
    <div className="BackHeader">
      <img src={BackArrow} alt="BackBtn" onClick={() => navigate(-1)} />
      <img src={logo} alt="logo" onClick={() => navigate("/")} />
    </div>
  );
}

export default BackHeader;