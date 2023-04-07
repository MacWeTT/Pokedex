import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../models/Pokemon";
import { PokeStats } from "../../models/PokeStats";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const Search: React.FC = () => {
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
          position: "topCenter",
          timeout: 1000,
          message: `Fetching data for ${search}...`,
        });
        setTimeout(() => {
          navigate("/pokemon", {
            replace: false,
            state: { PokemonData, PokemonStats },
          });
        }, 1500);
      })
      .catch((err: any) => {
        console.error(err);
        setSearch("");
        iziToast.error({
          title: "Error",
          position: "topCenter",
          timeout: 1000,
          message: `${search} not found..Check query..`,
        });
      });
  }
  return (
    <div className="search flex justify-between flex-col p-4 bg-red-500">
      <nav>
        <h2 className="text-white text-2xl">Pokedex</h2>
      </nav>
      <div className="search-container flex flex-col justify-center">
        <h1 className="text-white text-2xl font-semibold text-center">
          Find your favourite Pokemon
        </h1>
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-gray-100 rounded-md px-2 py-2 my-4 mr-4 mx-2">
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
  );
};

export default Search;

// try {
//   const dataResponse = await fetch(dataAPI);
//   const data: Pokemon = await dataResponse.json().then((data) => data.id);

//   const statsResponse = await fetch(statsAPI);
//   const stats = await statsResponse.json();

//   console.log("Response status: ", dataResponse.status);
//   if (dataResponse.status === 200) {
//     iziToast.success({
//       title: "Success",
//       position: "topRight",
//       timeout: 3000,
//       message: `Fetching data for ${search}...`,
//     });
//     setTimeout(() => {
//       navigate("/pokemon", { replace: false, state: { data, stats } });
//     }, 3000);
//   }
// } catch (error: any) {
//   console.log(error);
//   setSearch("");
//   iziToast.error({
//     title: "Error",
//     position: "topRight",
//     timeout: 3000,
//     message: `${search} not found..Check query..`,
//   });
// }
