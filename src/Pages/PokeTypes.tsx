import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { PokemonTypes } from "../models/PokemonTypes";

//Chakra UI
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const PokeTypes: React.FC = () => {
  const [type, setType] = useState("normal");
  const [useType, setUseType] = useState({} as PokemonTypes);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setType(event.currentTarget.id);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${type}`,
    })
      .then((res) => {
        console.log(res.data);
        setUseType(res.data);
      })
      .catch((err) => console.log(err));
  }, [type]);

  return (
    <div className="types h-screen">
      <div className="types-main grid grid-cols-8 h-screen">
        <div className="types-all-container hidden md:grid grid-cols-1 overflow-y-scroll">
          {types.map((type) => (
            <div
              id={type}
              key={type}
              className={`filter type flex theme-${type}`}
              onClick={handleClick}
            >
              <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            </div>
          ))}
        </div>
        <main className="flex col-span-8 md:col-span-7 flex-col p-4">
          <Navbar />
          <div className="flex flex-col items-center my-4">
            <h1 className="text-4xl font-bold text-center my-4">
              {useType.name?.toUpperCase()}
            </h1>
            <h1 className="text-center text-2xl my-2">Damage Relations</h1>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Damage Type</Th>
                    <Th>Types</Th>
                    <Th>Damage Type</Th>
                    <Th>Types</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Double damage from</Td>
                    <Td>
                      {useType.damage_relations?.double_damage_from?.length !==
                      0 ? (
                        useType.damage_relations?.double_damage_from?.map(
                          (type) => (
                            <div
                              className={`filter-table uppercase type flex theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          )
                        )
                      ) : (
                        <h2>None</h2>
                      )}
                    </Td>
                    <Td>Double damage to</Td>
                    <Td>
                      {useType.damage_relations?.double_damage_to?.length !==
                      0 ? (
                        useType.damage_relations?.double_damage_to?.map(
                          (type) => (
                            <div
                              className={`filter-table uppercase type flex theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          )
                        )
                      ) : (
                        <h2>None</h2>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Half damage from</Td>
                    <Td>
                      {useType.damage_relations?.half_damage_from?.length !==
                      0 ? (
                        useType.damage_relations?.half_damage_from?.map(
                          (type) => (
                            <div
                              className={`filter-table uppercase type flex theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          )
                        )
                      ) : (
                        <h2>None</h2>
                      )}
                    </Td>
                    <Td>Half Damage to</Td>
                    <Td>
                      {useType.damage_relations?.half_damage_to?.length !==
                      0 ? (
                        useType.damage_relations?.half_damage_to?.map(
                          (type) => (
                            <div
                              className={`filter-table uppercase type theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          )
                        )
                      ) : (
                        <h2>None</h2>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Td>No Damage from</Td>
                    <Td>
                      {useType.damage_relations?.no_damage_from?.length !==
                      0 ? (
                        useType.damage_relations?.no_damage_from?.map(
                          (type) => (
                            <div
                              className={`filter-table uppercase type flex theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          )
                        )
                      ) : (
                        <h2>None</h2>
                      )}
                    </Td>
                    <Td>No Damage to</Td>
                    <Td>
                      {useType.damage_relations?.no_damage_to?.length !== 0 ? (
                        useType.damage_relations?.no_damage_to?.map((type) => {
                          return (
                            <div
                              className={`filter-table uppercase type flex theme-${type.name}`}
                              key={type.name}
                            >
                              <h2>{type.name}</h2>
                            </div>
                          );
                        })
                      ) : (
                        <div>None</div>
                      )}
                    </Td>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </div>
          <div className="types-all-mobile-container md:hidden">
            <h1 className="text-center text-2xl ">All Types</h1>
            <div className="grid grid-cols-2">
              {types.map((type) => (
                <div
                  id={type}
                  key={type}
                  className={`filter type flex theme-${type}`}
                  onClick={handleClick}
                >
                  <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PokeTypes;

const types = [
  "normal",
  "fire",
  "fighting",
  "water",
  "flying",
  "grass",
  "poison",
  "electric",
  "ground",
  "psychic",
  "rock",
  "ice",
  "bug",
  "dragon",
  "ghost",
  "dark",
  "steel",
  "fairy",
];
