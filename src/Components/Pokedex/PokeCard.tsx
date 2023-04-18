import React from "react";
// import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../models/Pokemon";
import { PokeStats } from "../../models/PokeStats";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();
  let PokemonData: Pokemon = pokemon;
  let PokemonStats: PokeStats;

  const handleClick = () => {
    fetch(pokemon.species.url)
      .then((res) => res.json())
      .then((data) => {
        PokemonStats = data as PokeStats;
        const flavorText = data.flavor_text_entries.filter(
          (entry: any) => entry.language.name === "en"
        );
        flavorText.forEach((entry: any) => {
          entry.flavor_text = entry.flavor_text.replace(
            /(\r\n|\n|\r|\f)/gm,
            " "
          );
        });
        PokemonStats = { ...data, flavor_text_entries: flavorText };
        iziToast.info({
          title: "Info",
          position: "topRight",
          timeout: 1000,
          message: `Navigating to ${PokemonData.name}...`,
        });
        setTimeout(() => {
          navigate("/pokemon", { state: { PokemonData, PokemonStats } });
        }, 1000);
      });
  };

  return (
    <div
      className="card border-2 border-gray-300 rounded relative"
      key={pokemon.id}
    >
      <h1 className="absolute top-2 right-2 font-medium text-2xl">
        {pokemon.id}
      </h1>
      <h1 className="uppercase absolute bottom-2 right-2 font-medium">
        <button type="submit" onClick={handleClick}>
          {pokemon.name}
        </button>
      </h1>
      <div className="card-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </div>
  );
};

export default PokeCard;
