import "./Home.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Search from "../../components/Search/Search";
import Hamburger from "../../components/Hamburger/Hamburger";
// import MetroMap from "../../components/MetroMap/MetroMap";


function Home() {
  return (
    <div className="Home">
      <Hamburger />
      <Search />
      {/* <MetroMap /> */}
      <BottomNav />
    </div>
  );
}

export default Home;
