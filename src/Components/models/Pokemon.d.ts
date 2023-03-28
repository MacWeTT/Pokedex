export interface Pokemon {
  abilities?: AbilitiesEntity[] | null;
  base_experience: number;
  height: number;
  id: number;
  moves?: MovesEntity[] | null;
  name: string;
  order: number;
  sprites: Sprites;
  stats?: StatsEntity[] | null;
  types?: TypesEntity[] | null;
  weight: number;
}

interface AbilitiesEntity {
  ability: NameUrl;
}

interface MovesEntity {
  move: NameUrl;
}

interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

interface TypesEntity {
  slot: number;
  type: NameUrl;
}

interface NameUrl {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
  front_female?: string | null;
  front_shiny: string;
  front_shiny_female?: string | null;
  other: OtherSprite;
}

interface OtherSprite {
  dream_world: { front_default: string; front_female?: string | null };
  home: {
    front_default: string;
    front_female?: string | null;
    front_shiny: string;
    front_shiny_female?: string | null;
  };
}
