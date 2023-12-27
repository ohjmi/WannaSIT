import "./Home.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Search from "../../components/Search/Search";

function Home() {
  return (
    <div className="App">
      <Search />
      <BottomNav />
    </div>
  );
}

export default Home;
