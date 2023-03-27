import axios from "axios";

export default class GetPokemon {
  private static API: string = "https://pokeapi.co/api/v2/pokemon/";

  public static getPokemon(pokemon: string) {
    let UserURL: string = `${this.API}${pokemon}`;
    return axios.get(UserURL);
  }
}
