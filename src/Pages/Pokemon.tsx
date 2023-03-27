import React from "react";

const Pokemon: React.FC = () => {
  return (
    <div className="pokemon-data flex md:flex-row flex-col">
      <div className="pokemon-image flex justify-center items-center"></div>
      <div className="pokemon-info flex flex-col justify-center items-center"></div>
    </div>
  );
};

export default Pokemon;
