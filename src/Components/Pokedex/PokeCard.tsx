import React from "react";
import { Pokemon } from "../../models/Pokemon";
// import classNames from "classnames";
// import { useNavigate } from "react-router-dom";
// import GetPokemonStats from "../../API/getPokemonStats";

interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  // const navigate = useNavigate();
  // const { pokemonStats } = GetPokemonStats(pokemon.id);
  // console.log(pokemonStats);

  // const handleClick = () => {
  //   setTimeout(() => {
  //     navigate("/pokemon", { state: { pokemon, pokemonStats } });
  //   }, 500);
  // };
  return (
    <div
      className="card border-2 border-gray-300 rounded relative"
      key={pokemon.id}
    >
      <h1 className="absolute top-2 right-2 font-medium text-2xl">
        {pokemon.id}
      </h1>
      <h1 className="uppercase absolute bottom-2 right-2 font-medium">
        {pokemon.name}
      </h1>
      <div className="card-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </div>
  );
};

export default PokeCard;
