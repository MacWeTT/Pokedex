import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../models/Pokemon";
import { PokeStats } from "../models/PokeStats";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const Landing: React.FC = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  let PokemonData: Pokemon;
  let PokemonStats: PokeStats;

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const dataAPI: string = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

    fetch(dataAPI)
      .then((res) => res.json())
      .then((data) => {
        const statsAPI: string = `https://pokeapi.co/api/v2/pokemon-species/${data?.id}`;
        PokemonData = data as Pokemon;
        return fetch(statsAPI);
      })
      .then((res) => res.json())
      .then((data) => {
        PokemonStats = data as PokeStats;
        iziToast.success({
          title: "Success",
          position: "topRight",
          timeout: 3000,
          message: `Fetching data for ${search}...`,
        });
        setTimeout(() => {
          navigate("/pokemon", {
            replace: false,
            state: { PokemonData, PokemonStats },
          });
        }, 3000);
      })
      .catch((err: any) => {
        console.error(err);
        setSearch("");
        iziToast.error({
          title: "Error",
          position: "topRight",
          timeout: 3000,
          message: `${search} not found..Check query..`,
        });
      });
  }
  return (
    <>
      <div className="landing relative">
        <div className="search"></div>
        <div className="search-container flex flex-col justify-center absolute">
          <h1 className="text-white text-5xl font-bold text-center">
            Find your favourite Pokemon
          </h1>
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gray-100 rounded-md px-4 py-4 my-4 mr-4 mx-2">
              <form
                method="get"
                onSubmit={handleSubmit}
                className="flex items-center justify-center"
              >
                <div className="search-icon px-2 text-black hover:text-gray-500 transition-all duration-300 flex items-center">
                  <input
                    type="text"
                    name="search"
                    id="pokemon"
                    onChange={handleChange}
                    placeholder="Search by name or ID.."
                    className="flex-1 bg-gray-100 focus:outline-none items-center"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={handleSubmit}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
