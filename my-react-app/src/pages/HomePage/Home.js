import "./Home.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Search from "../../components/Search/Search";
import Hamburger from "../../components/Hamburger/Hamburger";
import MetroMap from "../../assets/images/MetroMap.svg";

function Home() {
  return (
    <div className="Home">
      <Hamburger />
      <Search />
      <img src={MetroMap} alt="Map" className="metroMap" />
      <BottomNav />
    </div>
  );
}

export default Home;
