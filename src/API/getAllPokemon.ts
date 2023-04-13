import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

type results = {
  name?: string | undefined;
  url?: string | undefined;
};

function GetAllPokemon(offset: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemonResults, setPokemonResults] = useState<results[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/`,
      params: { limit: 60, offset: offset },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPokemonResults((results) => {
          return [...new Set([...results, ...res.data.results])];
        });
        setHasMore(res.data.next !== null);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [offset]);

  return { loading, error, pokemonResults, hasMore };
}

export default GetAllPokemon;
