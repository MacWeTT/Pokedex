import React, { SyntheticEvent, useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import classNames from "classnames";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//ChakraUI
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Wrap,
  WrapItem,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

//Models
import { Pokemon } from "../models/Pokemon";
import { PokeStats } from "../models/PokeStats";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const PokemonReq = location.state;

  //Pokemon JSON Objects
  const [Pokemon, setPokemon] = useState<Pokemon | null>(
    PokemonReq?.PokemonData as Pokemon
  );
  const [PokeStats, setPokeStats] = useState<PokeStats | null>(
    PokemonReq?.PokemonStats as PokeStats
  );

  //Submissions
  const [search, setSearch] = useState<string | null>(null);
  const [submit, setSubmit] = useState(false);
  const [prevAndNext, setPrevAndNext] = useState(false);

  //PokemonAPI Data
  const [type1, setType1] = useState<string>(
    Pokemon ? Pokemon.types[0].type.name : "normal"
  );
  const [type2, setType2] = useState<string>(
    Pokemon ? Pokemon?.types[1]?.type?.name : ""
  );
  const [pokemonID, setPokemonID] = useState<number | null>(
    Pokemon?.id as number
  );

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleNext = () => {
    if (pokemonID) {
      setPokemonID(pokemonID + 1);
      setPrevAndNext(true);
    } else {
      iziToast.error({
        title: "Error",
        position: "center",
        timeout: 1500,
        message: `No Pokemon ID found..`,
      });
    }
  };
  const handlePrev = () => {
    if (pokemonID) {
      setPokemonID(pokemonID - 1);
      setPrevAndNext(true);
    } else {
      iziToast.error({
        title: "Error",
        position: "center",
        timeout: 1500,
        message: `No Pokemon ID found..`,
      });
    }
  };

  const replaceEscapeChars = (str: string) =>
    str.replace(/(\r\n|\n|\r|\f)/gm, " ");

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
          setPokemonID(data.id as number);
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
          console.log(data);
          const flavorText = data.flavor_text_entries.filter(
            (entry: any) => entry.language.name === "en"
          );
          flavorText.forEach((entry: any) => {
            entry.flavor_text = replaceEscapeChars(entry.flavor_text);
          });
          setPokeStats({ ...data, flavor_text_entries: flavorText });
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
      setSubmit(false);
    } else if (prevAndNext) {
      const dataAPI: string = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
      fetch(dataAPI)
        .then((res) => res.json())
        .then((data) => {
          const statsAPI: string = `https://pokeapi.co/api/v2/pokemon-species/${data?.id}`;
          setPokemon(data as Pokemon);
          setPokemonID(data.id as number);
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
          const flavorText = data.flavor_text_entries.filter(
            (entry: any) => entry.language.name === "en"
          );
          flavorText.forEach((entry: any) => {
            entry.flavor_text = replaceEscapeChars(entry.flavor_text);
          });
          setPokeStats({ ...data, flavor_text_entries: flavorText });
          iziToast.success({
            title: "Success",
            position: "topLeft",
            timeout: 750,
            message: `Fetching data for ${pokemonID}...`,
          });
        })
        .catch((err: any) => {
          console.error(err);
          iziToast.error({
            title: "Error",
            position: "topLeft",
            timeout: 1500,
            message: `${pokemonID} not found..Check query..`,
          });
        });
      setPrevAndNext(false);
    }
  }, [
    submit,
    search,
    Pokemon,
    PokeStats,
    pokemonID,
    type1,
    type2,
    prevAndNext,
  ]);

  const themeClass: string[] = [
    themeTypes[type1 as keyof Theme],
    type2 ? themeTypes[type2 as keyof Theme] : "",
  ];

  return (
    <div className="flex flex-col justify-evenly">
      <nav
        className={classNames(
          "search-box flex items-center md:justify-between justify-center",
          themeClass[0]
        )}
      >
        <div className="md:block text-3xl pl-4 font-semibold hidden text-justify">
          <Link
            to="/"
            className="hover:text-gray-700 transition-all duration-300"
          >
            Pokedex
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="back-button pt-1 pr-1">
            <Link to="/">
              <button className="text-black hover:text-gray-700 transition-all duration-300">
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
          <span className="nav-links hidden lg:flex">
            <div className="mx-4 p-1.5">
              <Link to="/types" className="nav-link">
                Types
              </Link>
            </div>
            <div className="mx-4 p-1.5">
              <Link to="/locations" className="nav-link">
                Locations
              </Link>
            </div>
            <div className="mx-4 p-1.5">
              <Link to="/items" className="nav-link">
                Items
              </Link>
            </div>
            <div className="mx-4 p-1.5">
              <Link to="/pokedex" className="nav-link">
                Pokedex
              </Link>
            </div>
          </span>
        </div>
      </nav>
      {Pokemon && type1 ? (
        <>
          <div
            className={classNames(
              "flex justify-between items-center",
              themeClass[0]
            )}
          >
            <span className="button__previous ml-10 flex flex-col justify-center items-center">
              <button
                onClick={handlePrev}
                className="inline-flex text-white bg-black border-0 p-1 transition-all duration-300 focus:outline-none hover:bg-gray-700 rounded-full text-lg"
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h2 className="mt-2 text-xl font-semibold">
                {Pokemon?.id - 1 ?? "None"}
              </h2>
            </span>
            <div
              className={classNames(
                "pokemon-sprite w-72 h-72 items-center container flex justify-between p-4 relative",
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
            <span className="button__next mr-10 flex flex-col justify-center items-center">
              <button
                onClick={handleNext}
                className="inline-flex text-white bg-black transition-all duration-300 border-0 p-1 focus:outline-none hover:bg-gray-700 rounded-full text-lg"
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              <h2 className="mt-2 text-xl font-semibold">
                {Pokemon?.id + 1 ?? "None"}
              </h2>
            </span>
          </div>
          <div className="pokemon-data p-4 m-4">
            <span className="flex justify-between">
              <h1 className="bg-black text-white inline p-2 rounded-lg text-3xl my-2 id-tag text-center">
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
            <Wrap>
              <WrapItem>
                <Avatar
                  name={Pokemon?.name}
                  src={Pokemon?.sprites?.front_default}
                  borderColor="gray.500"
                  size="lg"
                />
                <Avatar
                  name={Pokemon?.name}
                  src={Pokemon?.sprites?.front_shiny}
                  borderColor="gray.500"
                  size="lg"
                />
              </WrapItem>
            </Wrap>
            <Tabs defaultIndex={0} colorScheme={themeClass[0]}>
              <TabList>
                <Tab>Info</Tab>
                <Tab>Stats</Tab>
                <Tab>About</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p className="text-justify">
                    {PokeStats?.flavor_text_entries[0].flavor_text}
                  </p>
                  <p className="text-md mb-2">
                    Evolves From:
                    {PokeStats?.evolves_from_species?.name ? (
                      <span className="hover:underline-offset-1 first-letter:capitalize">
                        {" " + PokeStats?.evolves_from_species?.name}
                      </span>
                    ) : (
                      " None"
                    )}
                  </p>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Abilities
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Table>
                          <Tbody>
                            {Pokemon?.abilities?.map((ability, index) => {
                              return (
                                <Tr key={index} className="uppercase">
                                  <Td>{ability.ability.name}</Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Varieties
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Table>
                          <Tbody>
                            {PokeStats?.varieties?.map((variety, index) => {
                              return (
                                <Tr key={index} className="uppercase">
                                  <Td>{variety.pokemon.name}</Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            All Moves
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Table>
                          <Tbody>
                            {Pokemon.moves?.map((move, index) => {
                              return (
                                <Tr key={index} className="uppercase">
                                  <Td>{move.move.name}</Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <p>#Evolution chain</p>
                </TabPanel>
                <TabPanel>
                  <h3 className="flex justify-between my-2">
                    <p>Attack</p>
                    <p>{Pokemon?.stats[1]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[1]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Defense</p>
                    <p>{Pokemon?.stats[2]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[2]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Speed</p>
                    <p>{Pokemon?.stats[5]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[5]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Hitpoints</p>
                    <p>{Pokemon?.stats[0]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[0]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Special Attack</p>
                    <p>{Pokemon?.stats[3]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[3]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Special Defense</p>
                    <p>{Pokemon?.stats[4]?.base_stat}</p>
                  </h3>
                  <Progress value={Pokemon?.stats[4]?.base_stat} />
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        <Tr>
                          <Th>Height</Th>
                          <Td>{Pokemon?.height}</Td>
                          <Th>Weight</Th>
                          <Td>{Pokemon?.weight}</Td>
                        </Tr>
                        <Tr>
                          <Th>Base Happiness</Th>
                          <Td>{PokeStats?.base_happiness}</Td>
                          <Th>Base Experience</Th>
                          <Td>{Pokemon?.base_experience}</Td>
                        </Tr>
                        <Tr>
                          <Th>Gender Differences</Th>
                          <Td>
                            {PokeStats?.has_gender_differences === true
                              ? "Yes"
                              : "No"}
                          </Td>
                          <Th>Hatch Counter</Th>
                          <Td>{PokeStats?.hatch_counter}</Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>Growth Rate</Th>
                          <Td className="uppercase">
                            {PokeStats?.growth_rate.name}
                          </Td>
                          <Th>Habitat</Th>
                          <Td className="uppercase">
                            {PokeStats?.habitat?.name ?? "None"}
                          </Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </>
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
