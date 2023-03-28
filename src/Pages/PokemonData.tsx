import React from "react";
import { useLocation } from "react-router-dom";
import { Pokemon } from "../Components/models/Pokemon";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const PokemonReq = location.state;
  const Pokemon: Pokemon = PokemonReq as Pokemon;

  return (
    <div>
      <h1>{Pokemon.id}</h1>
      <h1>{Pokemon.name}</h1>
      <h1>Types: {Pokemon.types?.map((type: any) => type.type.name + " ")}</h1>
      <img src={Pokemon?.sprites?.front_default} alt="pokemon" />
      <img src={Pokemon?.sprites?.other?.home?.front_default} alt="pokemon" />
      <img
        src={Pokemon?.sprites?.other?.dream_world?.front_default}
        alt="pokemon"
      />
      <img src={Pokemon?.sprites?.front_shiny} alt={Pokemon.name} />
    </div>
  );
};

export default PokemonData;
