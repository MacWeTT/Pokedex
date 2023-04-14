import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Pokemon } from "../models/Pokemon";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function GetPokemon(query: string | number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState({} as Pokemon);
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");

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
        iziToast.success({
          title: "Success",
          position: "topLeft",
          timeout: 1500,
          message: `Fetching data for ${res.data.name}...`,
        });
        setType1(res.data.types[0].type.name);
        if (res.data.types[1]) {
          setType2(res.data.types[1].type.name);
        } else {
          setType2("");
        }
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pokemon]);

  return { loading, error, pokemon, type1, type2 };
}

export default GetPokemon;
