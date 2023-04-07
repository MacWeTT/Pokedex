import React, { SyntheticEvent, useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { Pokemon } from "../models/Pokemon";
import { PokeStats } from "../models/PokeStats";
import { Theme } from "../models/Theme";
import classNames from "classnames";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const PokemonReq = location.state;

  const [Pokemon, setPokemon] = useState(PokemonReq?.PokemonData as Pokemon);
  const [PokeStats, setPokeStats] = useState(
    PokemonReq?.PokemonStats as PokeStats
  );

  const [search, setSearch] = useState<string | null>(null);
  const [submit, setSubmit] = useState(false);

  const [type1, setType1] = useState(
    Pokemon ? Pokemon.types[0].type.name : "normal"
  );
  const [type2, setType2] = useState(
    Pokemon ? Pokemon?.types[1]?.type?.name : ""
  );

  const [tab, setTab] = useState(0);

  const tabs = ["Info", "Stats", "About"];

  const tabContents = [
    {
      name: "Info",
      content: (
        <p className="text-justify mt-4">
          {PokeStats?.flavor_text_entries[0]?.flavor_text}
        </p>
      ),
    },
    {
      name: "Stats",
      content: (
        <table className="table-auto border-gray-700 mt-4">
          <tbody>
            <tr>
              <th>Height</th>
              <td>{Pokemon?.height}</td>
              <th>Weight</th>
              <td>{Pokemon?.weight}</td>
            </tr>
            <tr>
              <th>Attack</th>
              <td>{Pokemon?.stats[1]?.base_stat}</td>
              <th>Defense</th>
              <td>{Pokemon?.stats[2]?.base_stat}</td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>{Pokemon?.stats[5]?.base_stat}</td>
              <th>Hitpoints</th>
              <td>{Pokemon?.stats[0]?.base_stat}</td>
            </tr>
            <tr>
              <th>Special Attack</th>
              <td>{Pokemon?.stats[3]?.base_stat}</td>
              <th>Special Defense</th>
              <td>{Pokemon?.stats[4]?.base_stat}</td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      name: "About",
      content: (
        <div className="stats-data w-60 flex items-center px-2 justify-between">
          <h1>No About Data Yet</h1>
        </div>
      ),
    },
  ];

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    setSubmit(true);
  }, []);

  useEffect(() => {
    if (submit && search !== null && search !== "") {
      const dataAPI: string = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

      fetch(dataAPI)
        .then((res) => res.json())
        .then((data) => {
          const statsAPI: string = `https://pokeapi.co/api/v2/pokemon-species/${data?.id}`;
          setPokemon(data as Pokemon);
          setType1(data.types[0].type.name);
          if (data.types[1]) {
            setType2(data.types[1].type.name);
          } else {
            setType2("");
          }
          return fetch(statsAPI);
        })
        .then((res) => res.json())
        .then((data) => {
          setPokeStats(data as PokeStats);
          iziToast.success({
            title: "Success",
            position: "topLeft",
            timeout: 1500,
            message: `Fetching data for ${search}...`,
          });
          console.log(Pokemon);
          console.log(PokeStats);
        })
        .catch((err: any) => {
          console.error(err);
          iziToast.error({
            title: "Error",
            position: "topLeft",
            timeout: 1500,
            message: `${search} not found..Check query..`,
          });
        });
    }
    setSubmit(false);
  }, [submit, search, Pokemon, PokeStats, type1, type2]);

  const themeClass: string[] = [
    themeTypes[type1 as keyof Theme],
    type2 ? themeTypes[type2 as keyof Theme] : "",
  ];

  return (
    <div className="h-screen flex flex-col justify-evenly lg:my-0 my-20">
      <div className="search-box absolute top-0 flex items-center justify-center md:justify-between w-screen">
        <div className="text-3xl pl-4 nav-heading">Pokedex</div>
        <div className="flex items-center justify-center">
          <div className="back-button pt-1 pr-1">
            <Link to="/">
              <button className="text-black hover:text-gray-500 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
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
                  placeholder="Enter Name or ID.."
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
      <div className="flex flex-col justify-evenly items-center">
        {Pokemon && type1 ? (
          <div className="pokemon lg:p-20 container flex flex-col lg:flex-row justify-evenly ">
            <div className="flex justify-center items-center">
              <div
                className={classNames(
                  "pokemon-sprite w-72 h-72 items-center container flex justify-center p-4",
                  themeClass[0]
                )}
              >
                {Pokemon?.sprites?.other?.dream_world?.front_default ? (
                  <img
                    src={Pokemon?.sprites?.other?.dream_world?.front_default}
                    alt="pokemon"
                    className="object-contain items-center w-full h-full"
                  />
                ) : (
                  <img
                    src={Pokemon?.sprites?.other?.home?.front_default}
                    alt="pokemon"
                    className="object-contain items-center w-full h-full"
                  />
                )}
              </div>
            </div>
            <div className="pokemon-data p-4 m-4">
              <span className="flex justify-between">
                <h1 className="bg-black text-white inline p-2 rounded-lg text-3xl my-2">
                  {Pokemon?.id}
                </h1>
                <h1 className="uppercase py-2 font-bold text-3xl">
                  {Pokemon?.name}
                </h1>
              </span>
              <h1 className="flex justify-between my-2">
                <span>
                  <span className={classNames("type-data", themeClass[0])}>
                    {Pokemon.types[0].type.name}
                  </span>
                  {Pokemon.types[1] ? (
                    <span className={classNames("type-data", themeClass[1])}>
                      {Pokemon.types[1].type.name}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
                <span className="uppercase font-semibold">
                  {PokeStats?.generation.name}
                </span>
              </h1>
              <div>
                <ul className="tabs grid grid-cols-3 cursor-pointer">
                  {tabs.map((tab, index) => (
                    <li
                      key={index}
                      onClick={() => setTab(index)}
                      className={classNames(
                        "p-2 border-2 border-black text-center hover:font-semibold",
                        themeClass[0]
                      )}
                    >
                      {tab}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center align-center">
                  {tabContents[tab].content}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container flex flex-col justify-center items-center">
            <h1 className="text-center text-4xl">
              You haven't fetched any data!
            </h1>
            <br />
            <Link
              to="/"
              className="font-medium flex items-between text-center text-2xl"
            >
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </p>
              <p className="italic hover:font-bold">Go Back</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const themeTypes: Theme = {
  normal: "theme-normal",
  fire: "theme-fire",
  water: "theme-water:",
  grass: "theme-grass",
  electric: "theme-electric",
  ice: "theme-ice",
  fighting: "theme-fighting",
  poison: "theme-poison",
  ground: "theme-ground",
  flying: "theme-flying",
  psychic: "theme-psychic",
  bug: "theme-bug",
  rock: "theme-rock",
  ghost: "theme-ghost",
  dragon: "theme-dragon",
  dark: "theme-dark",
  steel: "theme-steel",
  fairy: "theme-fairy",
};

export default PokemonData;
