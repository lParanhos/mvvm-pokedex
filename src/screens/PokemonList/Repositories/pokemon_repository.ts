import {PokeApiResult} from '../../../Models/pokeApiModel';
import {IPokemon} from '../../../Models/pokemon';
import {api} from '../../../services/api';

export abstract class IPokemonRepository {
  abstract getAll(): Promise<PokeApiResult>;
  abstract fetchPokemonData(pokemonName: string): Promise<IPokemon>;
  abstract fetchMoreData(pokemonName: string): Promise<PokeApiResult>;
}

export class PokemonRepository extends IPokemonRepository {
  async getAll(): Promise<PokeApiResult> {
    const result = await api.get<PokeApiResult>('/pokemon');
    return result.data;
  }

  async fetchPokemonData(pokemonName: string): Promise<IPokemon> {
    const result = await api.get<IPokemon>(`/pokemon/${pokemonName}`);
    return result.data;
  }

  async fetchMoreData(nextUrl: string): Promise<PokeApiResult> {
    const result = await api.get<PokeApiResult>('', {baseURL: nextUrl});
    return result.data;
  }
}
