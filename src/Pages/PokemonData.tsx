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

//API
import GetPokemon from "../API/getPokemon";
import GetPokemonStats from "../API/getPokemonStats";

const PokemonData: React.FC = () => {
  const location = useLocation();
  const ReqID = location.state.ID as number;
  const [pokemonID, setPokemonID] = useState<string | number>(ReqID ?? 1);

  const { loading, pokemon, type1, type2 } = GetPokemon(pokemonID ?? 1);
  const { pokemonStats, error } = GetPokemonStats(pokemonID ?? 1);

  //Submissions
  const [search, setSearch] = useState<string | null>(null);
  // const [submit, setSubmit] = useState(false);
  // const [prevAndNext, setPrevAndNext] = useState(false);

  useEffect(() => {
    if (search) {
      setPokemonID(search);
      setSearch(null);
    }
  }, [search, pokemonID]);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleNext = () => {
    if (pokemonID) {
      setPokemonID((pokemonID as number) + 1);
      // setPrevAndNext(true);
    } else {
      setPokemonID(1);
      iziToast.error({
        title: "Error",
        position: "topCenter",
        timeout: 1500,
        message: `No Pokemon ID found..`,
      });
    }
  };
  const handlePrev = () => {
    if (pokemonID) {
      setPokemonID((pokemonID as number) - 1);
      // setPrevAndNext(true);
    } else {
      setPokemonID(1);
      iziToast.error({
        title: "Error",
        position: "topCenter",
        timeout: 1500,
        message: `No Pokemon ID found..`,
      });
    }
  };

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    // setSubmit(true);
  }, []);

  const themeClass: string[] = [
    themeTypes[type1 as keyof Theme],
    type2 ? themeTypes[type2 as keyof Theme] : "",
  ];

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {pokemon && pokemonStats && (
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
            </div>
          </nav>
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
                {pokemon?.id - 1 ?? "None"}
              </h2>
            </span>
            <div
              className={classNames(
                "pokemon-sprite w-72 h-72 items-center container flex justify-between p-4 relative",
                themeClass[0]
              )}
            >
              {pokemon?.sprites?.other?.dream_world?.front_default ? (
                <img
                  src={pokemon?.sprites?.other?.dream_world?.front_default}
                  alt="pokemon"
                  className="object-contain items-center w-full h-full"
                />
              ) : (
                <img
                  src={pokemon?.sprites?.other?.home?.front_default}
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
                {pokemon?.id + 1 ?? "None"}
              </h2>
            </span>
          </div>
          <div className="pokemon-data p-4 m-4">
            <span className="flex justify-between">
              <h1 className="bg-black text-white inline p-2 rounded-lg text-3xl my-2 id-tag text-center">
                {pokemon?.id}
              </h1>
              <h1 className="uppercase py-2 font-bold text-3xl">
                {pokemon?.name}
              </h1>
            </span>
            <h1 className="flex justify-between my-2">
              <span>
                <span className={classNames("type-data", themeClass[0])}>
                  {type1}
                </span>
                {type2 !== "" ? (
                  <span className={classNames("type-data", themeClass[1])}>
                    {type2}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span className="uppercase font-semibold">
                {pokemonStats?.generation.name}
              </span>
            </h1>
            <Wrap>
              <WrapItem>
                <Avatar
                  name={pokemon?.name}
                  src={pokemon?.sprites?.front_default}
                  borderColor="gray.500"
                  size="lg"
                />
                <Avatar
                  name={pokemon?.name}
                  src={pokemon?.sprites?.front_shiny}
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
                    {pokemonStats?.flavor_text_entries[0].flavor_text}
                  </p>
                  <p className="text-md mb-2">
                    Evolves From:
                    {pokemonStats?.evolves_from_species?.name ? (
                      <span className="hover:underline-offset-1 first-letter:capitalize">
                        {" " + pokemonStats?.evolves_from_species?.name}
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
                            {pokemon?.abilities?.map((ability, index) => {
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
                            {pokemonStats?.varieties?.map((variety, index) => {
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
                            {pokemon.moves?.map((move, index) => {
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
                    <p>{pokemon?.stats[1]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[1]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Defense</p>
                    <p>{pokemon?.stats[2]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[2]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Speed</p>
                    <p>{pokemon?.stats[5]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[5]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Hitpoints</p>
                    <p>{pokemon?.stats[0]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[0]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Special Attack</p>
                    <p>{pokemon?.stats[3]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[3]?.base_stat} />
                  <h3 className="flex justify-between my-2">
                    <p>Special Defense</p>
                    <p>{pokemon?.stats[4]?.base_stat}</p>
                  </h3>
                  <Progress value={pokemon?.stats[4]?.base_stat} />
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        <Tr>
                          <Th>Height</Th>
                          <Td>{pokemon?.height}</Td>
                          <Th>Weight</Th>
                          <Td>{pokemon?.weight}</Td>
                        </Tr>
                        <Tr>
                          <Th>Base Happiness</Th>
                          <Td>{pokemonStats?.base_happiness}</Td>
                          <Th>Base Experience</Th>
                          <Td>{pokemon?.base_experience}</Td>
                        </Tr>
                        <Tr>
                          <Th>Height</Th>
                          <Td>{pokemon?.height}</Td>
                          <Th>Weight</Th>
                          <Td>{pokemon?.weight}</Td>
                        </Tr>
                        <Tr>
                          <Th>Gender Differences</Th>
                          <Td>
                            {pokemonStats?.has_gender_differences === true
                              ? "Yes"
                              : "No"}
                          </Td>
                          <Th>Hatch Counter</Th>
                          <Td>{pokemonStats?.hatch_counter}</Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>Growth Rate</Th>
                          <Td className="uppercase">
                            {pokemonStats?.growth_rate.name}
                          </Td>
                          <Th>Habitat</Th>
                          <Td className="uppercase">
                            {pokemonStats?.habitat?.name ?? "None"}
                          </Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}
    </>
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

// function replaceEscapeChars(str: string) {
//   return str.replace(/\\[\w\d]+/g, " ");
// }

// useEffect(() => {
//   if (submit && search !== null && search !== "") {
//     const dataAPI: string = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

//     fetch(dataAPI)
//       .then((res) => res.json())
//       .then((data) => {
//         const statsAPI: string = `https://pokeapi.co/api/v2/pokemon-species/${data?.id}`;
//         setPokemon(data as Pokemon);
//         setPokemonID(data.id as number);
//         setType1(data.types[0].type.name);
//         if (data.types[1]) {
//           setType2(data.types[1].type.name);
//         } else {
//           setType2("");
//         }
//         console.log(PokeStats?.flavor_text_entries[0].flavor_text);
//         return fetch(statsAPI);
//       })
//       .then((res) => res.json())
//       .then((data) => {
//         setPokeStats(data as PokeStats);
//         iziToast.success({
//           title: "Success",
//           position: "topLeft",
//           timeout: 1500,
//           message: `Fetching data for ${search}...`,
//         });
//         console.log(Pokemon);
//         console.log(PokeStats);
//       })
//       .catch((err: any) => {
//         console.error(err);
//         iziToast.error({
//           title: "Error",
//           position: "topLeft",
//           timeout: 1500,
//           message: `${search} not found..Check query..`,
//         });
//       });
//     setSubmit(false);
//   } else if (prevAndNext) {
//     const dataAPI: string = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
//     fetch(dataAPI)
//       .then((res) => res.json())
//       .then((data) => {
//         const statsAPI: string = `https://pokeapi.co/api/v2/pokemon-species/${data?.id}`;
//         setPokemon(data as Pokemon);
//         setPokemonID(data.id as number);
//         setType1(data.types[0].type.name);
//         if (data.types[1]) {
//           setType2(data.types[1].type.name);
//         } else {
//           setType2("");
//         }
//         return fetch(statsAPI);
//       })
//       .then((res) => res.json())
//       .then((data) => {
//         setPokeStats(data as PokeStats);
//         iziToast.success({
//           title: "Success",
//           position: "topLeft",
//           timeout: 750,
//           message: `Fetching data for ${pokemonID}...`,
//         });
//       })
//       .catch((err: any) => {
//         console.error(err);
//         iziToast.error({
//           title: "Error",
//           position: "topLeft",
//           timeout: 1500,
//           message: `${pokemonID} not found..Check query..`,
//         });
//       });
//     setPrevAndNext(false);
//   }
// }, [
//   submit,
//   search,
//   Pokemon,
//   PokeStats,
//   pokemonID,
//   type1,
//   type2,
//   prevAndNext,
// ]);

// : (
//         <div className="container flex flex-col justify-center items-center">
//           <h1 className="text-center text-4xl">
//             You haven't fetched any data!
//           </h1>
//           <br />
//           <Link
//             to="/"
//             className="font-medium flex items-between text-center text-2xl"
//           >
//             <p className="flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15.75 19.5L8.25 12l7.5-7.5"
//                 />
//               </svg>
//             </p>
//             <p className="italic hover:font-bold">Go Back</p>
//           </Link>
//         </div>
