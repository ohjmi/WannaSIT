import "./HamHeader.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import Hamburger from "../Hamburger/Hamburger";

function HamHeader() {
  const navigate = useNavigate();


  return (
    <div className="HamHeader">
      <Hamburger />
      <img src={logo} alt="logo" onClick={() => navigate("/")} />
    </div>
  );
}

export default HamHeader;
