import { useState } from "react";
import AppDownload from "../../Components/AppDownload/AppDownload";
import ExploreMenu from "../../Components/Explore-Menu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import Header from "../Header/Header";
import "./Home.css";

const Home = () => {

  const [Category, setCategory] = useState("All");

  return (
    <div id="home">
      <Header />
      <div className="main-body">
      <ExploreMenu Category={Category} setCategory={setCategory} />
      <FoodDisplay Category={Category} />
      <AppDownload />
      </div>

    </div>
  );
};

export default Home;
