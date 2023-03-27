import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    let api = `https://pokeapi.co/api/v2/pokemon/${search}`;
    try {
      const response = await fetch(api);
      const json = await response.json();
      console.log("Response status: ", response.status);
      if (response.status === 200) {
        iziToast.success({
          title: "Success",
          position: "topRight",
          timeout: 3000,
          message: `Fetching data for ${search}...`,
        });
        console.log(json);
        setTimeout(() => {
          navigate("/pokemon", { replace: false });
        }, 3000);
      }
    } catch (error: any) {
      console.log(error);
      setSearch("");
      iziToast.error({
        title: "Error",
        position: "topRight",
        timeout: 3000,
        message: `${search} not found..Check query..`,
      });
    }
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
        <div className="search-box flex items-center justify-center pt-4">
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
            <div className="search-icon px-2 text-white hover:text-black transition-all duration-300 block">
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
      </div>
    </div>
  );
};

export default Search;