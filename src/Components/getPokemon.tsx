export async function getPokemon() {
  let pokemon = "charmander";
  let api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);



  try {
  } catch (error: any) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
}
