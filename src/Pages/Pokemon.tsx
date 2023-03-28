import React from "react";
import { useLocation } from "react-router-dom";

const Pokemon: React.FC = () => {
  const location = useLocation();
  const pokemonReq = location.state;
  console.log(pokemonReq);

  return (
    <div>
      <h1>{pokemonReq.id}</h1>
      <h1>{pokemonReq.name}</h1>
      <h1>
        Types: {pokemonReq.types.map((type: any) => type.type.name + " ")}
      </h1>
      <img src={pokemonReq?.sprites?.front_default} alt="pokemon" />
    </div>
  );
};

export default Pokemon;
