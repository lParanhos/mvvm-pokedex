import React from 'react';
import {PokemonRepository} from './Repositories/pokemon_repository';
import ViewModel from './ViewModel/PokemonListViewModel';
import View from './View/PokemonListView';

const PokemonList = () => {
  const viewModel = new ViewModel(new PokemonRepository());
  return <View viewModel={viewModel} />;
};

export default PokemonList;
