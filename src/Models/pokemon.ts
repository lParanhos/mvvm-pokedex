type PokemonType =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export interface PokemonTypesProps {
  slot: number;
  type: {name: PokemonType; url: string};
}

export interface IPokemon {
  id: number;
  name: string;
  number: string;
  image: string;
  specie: string;
  height: string;
  weight: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
  types: PokemonTypesProps[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
