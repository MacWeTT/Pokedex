import React from "react";
import Search from "../Components/Home/Search";
import Filters from "../Components/Home/Filters";
import { About } from "../Components/Home/About";

const Home: React.FC = () => {
  return (
    <div>
      <Search />
      <About />
      <Filters />
    </div>
  );
};

export default Home;
