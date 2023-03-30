import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon } from "../models/Pokemon";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByNameorID: builder.query<Pokemon, string | number>({
      query: (value) => `pokemon/${value}`,
    }),
  }),
});

export const { useGetPokemonByNameorIDQuery } = pokemonApi;
