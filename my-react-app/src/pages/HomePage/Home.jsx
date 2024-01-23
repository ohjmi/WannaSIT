import "./Home.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Search from "../../components/Search/Search";
import HamHeader from "../../components/Header/HamHeader";


function Home() {
  return (
    <div className="Home">
      <HamHeader />
      <Search />
      <BottomNav />
    </div>
  );
}

export default Home;
