import React, { SyntheticEvent } from "react";
import { useGetPokemonByNameorIDQuery } from "../Services/Pokemon";

const Home: React.FC = () => {
  const [search, setSearch] = React.useState<string | null>();

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const {
    data: Pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameorIDQuery(search?.toLowerCase() || "bulbasaur");

  return (
    <div className="sm:flex items-center justify-center flex-col">
      <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 m-4 ">
        <input
          type="text"
          placeholder="Search by id or name..."
          onChange={handleChange}
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {error ? (
        <p>Oh No!</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : Pokemon ? (
        <div>
          <h1>{Pokemon?.species.name}</h1>
          <img
            src={Pokemon?.sprites.front_default}
            alt={Pokemon?.species.name}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
