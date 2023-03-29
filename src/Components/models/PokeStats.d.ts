export interface PokeStats {
  base_happiness: number;
  capture_rate: number;
  color: NameURL;
  egg_groups?: NameURL[] | null;
  evolution_chain: EvolutionChain;
  evolves_from_species: NameURL;
  flavor_text_entries: FlavorTextEntriesEntity[];
  form_descriptions?: null[] | null;
  forms_switchable: boolean;
  gender_rate: number;
  genera?: GeneraEntity[] | null;
  generation: NameURL;
  growth_rate: NameURL;
  habitat: NameURL;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names?: NamesEntity[] | null;
  order: number;
  pal_park_encounters?: PalParkEncountersEntity[] | null;
  pokedex_numbers?: PokedexNumbersEntity[] | null;
  shape: NameURL;
  varieties?: VarietiesEntity[] | null;
}
interface NameURL {
  name: string;
  url: string;
}
interface EvolutionChain {
  url: string;
}
interface FlavorTextEntriesEntity {
  flavor_text: string;
  language: NameURL;
  version: NameURL;
}
interface GeneraEntity {
  genus: string;
  language: NameURL;
}
interface NamesEntity {
  language: NameURL;
  name: string;
}
interface PalParkEncountersEntity {
  area: NameURL;
  base_score: number;
  rate: number;
}
interface PokedexNumbersEntity {
  entry_number: number;
  pokedex: NameURL;
}
interface VarietiesEntity {
  is_default: boolean;
  pokemon: NameURL;
}
