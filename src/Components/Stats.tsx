const Stats = ({ pokemon }: any) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <h1>{pokemon.order}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};
export default Stats;
