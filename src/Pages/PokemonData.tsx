import React, { SyntheticEvent, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Pokemon } from "../Components/models/Pokemon";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const PokemonReq = location.state;
  const [Pokemon, setPokemon] = useState<Pokemon | null>(PokemonReq as Pokemon);

  const [search, setSearch] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmit(true);
  };
  const api = `https://pokeapi.co/api/v2/pokemon/${search}`;

  useEffect(() => {
    if (submit && search !== "" && search !== null) {
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          iziToast.success({
            title: "Success",
            position: "topRight",
            timeout: 1000,
            message: `Fetching data for ${search}...`,
          });
          setPokemon(data as Pokemon);
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
      setSubmit(false);
    }
  }, [submit, api, search]);

  if (Pokemon === null) {
    return (
      <div className="container flex flex-col justify-between items-center h-screen">
        <div className="search-box flex items-center justify-center pt-4">
          <form
            method="get"
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <div className="back-button px-2">
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
        <h1 className="text-center text-4xl">You haven't fetched any data!</h1>
        <br />
        <p className="m-10">
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
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="search-box flex items-center justify-center pt-4">
          <form
            method="get"
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <div className="back-button px-2">
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
        <h1>{Pokemon?.id}</h1>
        <h1>{Pokemon?.name}</h1>
        <h1>
          Types: {Pokemon?.types?.map((type: any) => type.type.name + " ")}
        </h1>
        <img src={Pokemon?.sprites?.front_default} alt="pokemon" />
        <img src={Pokemon?.sprites?.other?.home?.front_default} alt="pokemon" />
        <img
          src={Pokemon?.sprites?.other?.dream_world?.front_default}
          alt="pokemon"
        />
        <img src={Pokemon?.sprites?.front_shiny} alt={Pokemon?.name} />
      </div>
    );
  }
};

export default PokemonData;
