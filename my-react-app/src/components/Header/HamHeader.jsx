import "./HamHeader.css";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";

function HamHeader() {
  const navigate = useNavigate();
  return (
    <div className="HamHeader">
      <div className="headerCont">
        <Hamburger />
        <div className="logoWrap">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default HamHeader;