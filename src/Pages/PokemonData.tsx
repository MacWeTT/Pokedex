import React, { SyntheticEvent, useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { Pokemon } from "../Components/models/Pokemon";
import { PokeStats } from "../Components/models/PokeStats";
import classNames from "classnames";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const PokemonReq = location.state;

  const [Pokemon, setPokemon] = useState<Pokemon | null>(PokemonReq as Pokemon);
  const [PokeStats, setPokeStats] = useState<PokeStats | null>(null);

  const [search, setSearch] = useState<string | null>(null);
  const [searchID, setSearchID] = useState<string | null>(
    Pokemon ? Pokemon.id.toString() : null
  );

  const [submit, setSubmit] = useState(false);

  const [type1, setType1] = useState<string>(
    Pokemon ? Pokemon.types[0].type.name : "normal"
  );
  const [type2, setType2] = useState<string>(
    Pokemon ? Pokemon?.types[1]?.type?.name : ""
  );

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    setSubmit(true);
  }, []);

  const statsAPI = `https://pokeapi.co/api/v2/pokemon/${search}`;
  const dataAPI = `https://pokeapi.co/api/v2/pokemon-species/${searchID}`;

  useEffect(() => {
    if (submit && search !== null && search !== "") {
      fetch(statsAPI)
        .then((res) => res.json())
        .then((data) => {
          iziToast.success({
            title: "Success",
            position: "topRight",
            timeout: 1000,
            message: `Fetching data for ${search}...`,
          });
          setType1(data.types[0].type.name);
          if (data.types[1]) {
            setType2(data.types[1].type.name);
          } else {
            setType2("");
          }
          setPokemon(data as Pokemon);
          setSearchID(data.id.toString());
        })
        .catch((err) => {
          console.log(err);
          iziToast.error({
            title: "Error",
            position: "topRight",
            timeout: 2000,
            message: `${search} not found..Check query..`,
          });
        });
      fetch(dataAPI)
        .then((res) => res.json())
        .then((data) => {
          setPokeStats(data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
      setSubmit(false);
      console.log(Pokemon);
    }
    fetch(dataAPI)
      .then((res) => res.json())
      .then((data) => {
        setPokeStats(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setSubmit(false);
    console.log(Pokemon);
  }, [submit, statsAPI, dataAPI, search, Pokemon, PokeStats, type1, type2]);

  const themeClass: string[] = [
    themeTypes[type1 as keyof Theme],
    type2 ? themeTypes[type2 as keyof Theme] : "",
  ];

  return (
    <div className="container flex flex-col justify-evenly items-center h-screen">
      <div className="search-box fixed top-0 flex items-center justify-center pt-4">
        <div className="back-button pt-2 pr-4">
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
        <form
          method="get"
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            name="search"
            id="pokemon"
            onChange={handleChange}
            placeholder="Search.."
            className="px-5 p-2 border rounded-full outline-none relative"
          />
          <div className="search-icon px-2 text-black hover:text-gray-500 transition-all duration-300 block">
            <button type="submit">
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
      {Pokemon && type1 ? (
        <div
          className={classNames(
            "pokemon container flex justify-between p-4",
            themeClass[0]
          )}
        >
          <div className="pokemon-sprite items-center container flex justify-center flex-col object-cover">
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
          <div className="pokemon-data">
            <p className="flex justify-between">
              <h1 className="bg-black text-white inline p-2 rounded-lg text-3xl my-2">
                {Pokemon?.id}
              </h1>
              <h1 className="uppercase py-2 font-bold text-3xl">
                {Pokemon?.name}
              </h1>
            </p>
            <h1 className="flex">
              <p className={classNames("type-data", themeClass[0])}>
                {Pokemon.types[0].type.name}
              </p>
              {Pokemon.types[1] ? (
                <p className={classNames("type-data", themeClass[1])}>
                  {Pokemon.types[1].type.name}
                </p>
              ) : (
                ""
              )}
            </h1>
            <p className="text-justify">
              {PokeStats?.flavor_text_entries[0]?.flavor_text}
            </p>
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
  );
};

const themeTypes: Theme = {
  normal: "theme-normal",
  fire: "theme-fire",
  water: "theme-water",
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

interface Theme {
  normal: string;
  fire: string;
  water: string;
  grass: string;
  electric: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
}

export default PokemonData;
