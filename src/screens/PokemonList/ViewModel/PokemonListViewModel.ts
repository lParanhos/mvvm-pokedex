import {action, makeObservable, observable, runInAction} from 'mobx';
import {PokeApiResult} from '../../../Models/pokeApiModel';
import {IPokemon} from '../../../Models/pokemon';
import {IPokemonRepository} from '../repositories/pokemon_repository';

class PokemonListViewModel {
  _pkmRepository: IPokemonRepository;

  @observable count = 0;
  @observable nextUrl = '';
  @observable previousUrl = '';
  @observable pokemons: IPokemon[] = [];
  @observable isLoading = false;

  constructor(apiService: IPokemonRepository) {
    makeObservable(this);
    this._pkmRepository = apiService;

    runInAction(this.initStore);
  }

  @action initStore = async () => {
    this.isLoading = true;
    const result = await this.fetchData();
    this.nextUrl = result.next;
    this.previousUrl = result.previous ?? '';
    this.count = result.count;
    const pokemonList = await this.makePokemonList(
      result.results.map(res => res.name),
    );
    this.pokemons = this.pokemons.concat(pokemonList);
    this.isLoading = false;
  };

  @action onClick = (): void => {
    this.count += 1;
  };

  @action fetchData = async (): Promise<PokeApiResult> => {
    this.isLoading = true;
    const result = await this._pkmRepository.getAll();
    this.isLoading = false;
    return result;
  };

  @action fetchPokemonData = async (name: string): Promise<IPokemon> => {
    const result = await this._pkmRepository.fetchPokemonData(name);
    return {...result, name};
  };

  @action fetchMore = async () => {
    const result = await this._pkmRepository.fetchMoreData(this.nextUrl);
    this.nextUrl = result.next;
    this.previousUrl = result.previous ?? '';
    this.count = result.count;
    const pokemonList = await this.makePokemonList(
      result.results.map(res => res.name),
    );
    this.pokemons = this.pokemons.concat(pokemonList);
  };

  makePokemonList = async (names: string[]): Promise<IPokemon[]> => {
    const promises = names.map(this.fetchPokemonData);
    const results = await Promise.all(promises);
    return results;
  };
}

export default PokemonListViewModel;
