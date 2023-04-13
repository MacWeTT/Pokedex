import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../Components/Pokedex/PokeCard";
import { Pokemon } from "../models/Pokemon";
import GetAllPokemon from "../API/getAllPokemon";

const Pokedex: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const { loading, error, pokemonResults, hasMore } = GetAllPokemon(offset);

  useEffect(() => {
    pokemonResults.forEach((pokemon) => {
      axios({
        method: "GET",
        url: pokemon.url,
      })
        .then((res) => {
          setAllPokemon((prev) => {
            const pokemonExists = prev.some((p) => p.id === res.data.id);
            if (!pokemonExists) {
              return [...prev, res.data].sort((a, b) => a.id - b.id);
            }
            return prev;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [pokemonResults]);

  const handleSubmit = () => {
    setOffset(offset + 60);
    console.log(allPokemon);
  };

  return (
    <>
      <main className="container mx-auto my-auto flex flex-col justify-center ">
        <h1 className="text-4xl mb-4">Pokedex Entries</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 mx-10">
          {allPokemon.map((pokemon) => (
            <PokeCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
        {hasMore && (
          <button
            onClick={handleSubmit}
            className=" m-4 rounded bg-gray-400 block"
          >
            Load More
          </button>
        )}
      </main>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </>
  );
};

export default Pokedex;
