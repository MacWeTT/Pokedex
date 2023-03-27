export default interface Pokemon {
  abilities?: AbilitiesEntity[] | null;
  base_experience: number;
  forms?:
    | AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies[]
    | null;
  game_indices?: GameIndicesEntity[] | null;
  height: number;
  held_items?: null[] | null;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: MovesEntity[] | null;
  name: string;
  order: number;
  past_types?: null[] | null;
  species: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  sprites: Sprites;
  stats?: StatsEntity[] | null;
  types?: TypesEntity[] | null;
  weight: number;
}
export interface AbilitiesEntity {
  ability: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  is_hidden: boolean;
  slot: number;
}
export interface AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies {
  name: string;
  url: string;
}
export interface GameIndicesEntity {
  game_index: number;
  version: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface MovesEntity {
  move: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  version_group_details?: VersionGroupDetailsEntity[] | null;
}
export interface VersionGroupDetailsEntity {
  level_learned_at: number;
  move_learn_method: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  version_group: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface Sprites {
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
  // other: Other;
  // versions: Versions;
}
// export interface Other {
//   dream_world: DreamWorldOrIcons;
//   home: HomeOrOmegaruby-alphasapphireOrX-yOrUltra-sun-ultra-moon;
//   official-artwork: Official-artworkOrEmerald;
// }
// export interface DreamWorldOrIcons {
//   front_default: string;
//   front_female?: null;
// }
// export interface HomeOrOmegaruby-alphasapphireOrX-yOrUltra-sun-ultra-moon {
//   front_default: string;
//   front_female?: null;
//   front_shiny: string;
//   front_shiny_female?: null;
// }
// export interface Official-artworkOrEmerald {
//   front_default: string;
//   front_shiny: string;
// }
// export interface Versions {
//   generation-i: Generation-i;
//   generation-ii: Generation-ii;
//   generation-iii: Generation-iii;
//   generation-iv: Generation-iv;
//   generation-v: Generation-v;
//   generation-vi: Generation-vi;
//   generation-vii: Generation-vii;
//   generation-viii: Generation-viii;
// }
// export interface Generation-i {
//   red-blue: Red-blueOrYellow;
//   yellow: Red-blueOrYellow;
// }
// export interface Red-blueOrYellow {
//   back_default: string;
//   back_gray: string;
//   back_transparent: string;
//   front_default: string;
//   front_gray: string;
//   front_transparent: string;
// }
// export interface Generation-ii {
//   crystal: Crystal;
//   gold: GoldOrSilver;
//   silver: GoldOrSilver;
// }
// export interface Crystal {
//   back_default: string;
//   back_shiny: string;
//   back_shiny_transparent: string;
//   back_transparent: string;
//   front_default: string;
//   front_shiny: string;
//   front_shiny_transparent: string;
//   front_transparent: string;
// }
// export interface GoldOrSilver {
//   back_default: string;
//   back_shiny: string;
//   front_default: string;
//   front_shiny: string;
//   front_transparent: string;
// }
// export interface Generation-iii {
//   emerald: Official-artworkOrEmerald;
//   firered-leafgreen: Firered-leafgreenOrRuby-sapphire;
//   ruby-sapphire: Firered-leafgreenOrRuby-sapphire;
// }
// export interface Firered-leafgreenOrRuby-sapphire {
//   back_default: string;
//   back_shiny: string;
//   front_default: string;
//   front_shiny: string;
// }
// export interface Generation-iv {
//   diamond-pearl: Diamond-pearlOrHeartgold-soulsilverOrPlatinumOrAnimated;
//   heartgold-soulsilver: Diamond-pearlOrHeartgold-soulsilverOrPlatinumOrAnimated;
//   platinum: Diamond-pearlOrHeartgold-soulsilverOrPlatinumOrAnimated;
// }
// export interface Diamond-pearlOrHeartgold-soulsilverOrPlatinumOrAnimated {
//   back_default: string;
//   back_female?: null;
//   back_shiny: string;
//   back_shiny_female?: null;
//   front_default: string;
//   front_female?: null;
//   front_shiny: string;
//   front_shiny_female?: null;
// }
// export interface Generation-v {
//   black-white: Black-white;
// }
// export interface Black-white {
//   animated: Diamond-pearlOrHeartgold-soulsilverOrPlatinumOrAnimated;
//   back_default: string;
//   back_female?: null;
//   back_shiny: string;
//   back_shiny_female?: null;
//   front_default: string;
//   front_female?: null;
//   front_shiny: string;
//   front_shiny_female?: null;
// }
// export interface Generation-vi {
//   omegaruby-alphasapphire: HomeOrOmegaruby-alphasapphireOrX-yOrUltra-sun-ultra-moon;
//   x-y: HomeOrOmegaruby-alphasapphireOrX-yOrUltra-sun-ultra-moon;
// }
// export interface Generation-vii {
//   icons: DreamWorldOrIcons;
//   ultra-sun-ultra-moon: HomeOrOmegaruby-alphasapphireOrX-yOrUltra-sun-ultra-moon;
// }
// export interface Generation-viii {
//   icons: DreamWorldOrIcons;
// }
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface TypesEntity {
  slot: number;
  type: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}

// export interface Pokemon {
//   id: number;
//   name: string;
//   height: number;
//   order: number;
//   weight: number;
//   moves?: MovesEntity[] | null;
//   species: Species;
//   sprites: Sprites;
//   stats?: StatsEntity[] | null;
//   types?: TypesEntity[] | null;
//   past_types?: PastTypesEntity[] | null;
// }
// export interface Species {
//   name: string;
//   url: string;
// }
// export interface MovesEntity {
//   move: Species;
// }
// export interface Sprites {
//   front_default: string;
//   front_shiny: string;
// }
// export interface StatsEntity {
//   base_stat: number;
//   effort: number;
//   stat: AbilityOrFormsEntityOrVersionOrItemOrVersionGroupOrMoveLearnMethodOrMoveOrStatOrTypeOrGenerationOrSpecies;
// }
// export interface TypesEntity {
//   slot: number;
//   type: AbilityOrFormsEntityOrVersionOrItemOrVersionGroupOrMoveLearnMethodOrMoveOrStatOrTypeOrGenerationOrSpecies;
// }
// export interface PastTypesEntity {
//   generation: AbilityOrFormsEntityOrVersionOrItemOrVersionGroupOrMoveLearnMethodOrMoveOrStatOrTypeOrGenerationOrSpecies;
//   types?: TypesEntity[] | null;
// }
