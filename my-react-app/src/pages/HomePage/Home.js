import "./Home.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Search from "../../components/Search/Search";
import Hamburger from "../../components/Hamburger/Hamburger";

function Home() {
  return (
    <div className="Home">
      <Hamburger />
      <Search />
      <BottomNav />
    </div>
  );
}

export default Home;
