import React from 'react';
import ViewModel from './store/ViewModel';

import View from './View';

const Example = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default Example;
