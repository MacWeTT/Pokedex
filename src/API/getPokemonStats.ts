import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { PokeStats } from "../models/PokeStats";

function GetPokemonStats(query: string | number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemonStats, setPokemonStats] = useState({} as PokeStats);

  useEffect(() => {
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${query}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPokemonStats(res.data as PokeStats);
        console.log(pokemonStats);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pokemonStats]);

  return { loading, error, pokemonStats };
}

export default GetPokemonStats;
