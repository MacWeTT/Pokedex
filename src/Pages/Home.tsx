import React from "react";
import Search from "../Components/Search";
import Filters from "../Components/Filters";

const Home: React.FC = () => {
  return (
    <div>
      <Search />
      <Filters />
    </div>
  );
};

export default Home;
