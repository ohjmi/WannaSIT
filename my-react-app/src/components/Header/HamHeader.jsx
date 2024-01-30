import "./HamHeader.css";
import logo from "../../assets/images/logo.svg";
import Hamburger from "../Hamburger/Hamburger";

function HamHeader() {
  return (
    <div className="HamHeader">
      <div className="headerCont">
        <Hamburger />
        <div className="logoWrap">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HamHeader;
