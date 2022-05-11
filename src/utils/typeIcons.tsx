import {PokemonType} from './getColorByType';
import React from 'react';
import TypeIcons from '../assets/types';

export const getIconByType = (type: PokemonType) => {
  const Icon = TypeIcons[type];
  return <Icon width={14} height={14} />;
};
