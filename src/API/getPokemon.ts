import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Pokemon } from "../models/Pokemon";

function GetPokemon(query: string | number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState({} as Pokemon);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${query}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPokemon(res.data as Pokemon);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pokemon]);

  return { loading, error, pokemon };
}

export default GetPokemon;
