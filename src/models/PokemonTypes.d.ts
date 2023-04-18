export interface PokemonTypes {
  damage_relations: DamageRelations;
  game_indices?: GameIndicesEntity[] | null;
  generation: NameUrl;
  id: number;
  move_damage_class: NameUrl;
  moves?: NameUrl[] | null;
  name: string;
  names?: NamesEntity[] | null;
  past_damage_relations?: null[] | null;
  pokemon?: PokemonEntity[] | null;
}
export interface DamageRelations {
  double_damage_from: NameUrl[] | null;
  double_damage_to: NameUrl[] | null;
  half_damage_from: NameUrl[] | null;
  half_damage_to: NameUrl[] | null;
  no_damage_from: NameUrl[] | null;
  no_damage_to: NameUrl[] | null;
}
export interface NameUrl {
  name: string;
  url: string;
}
export interface GameIndicesEntity {
  game_index: number;
  generation: NameUrl;
}
export interface NamesEntity {
  language: NameUrl;
  name: string;
}
export interface PokemonEntity {
  pokemon: NameUrl;
  slot: number;
}
