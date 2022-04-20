import React from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, TouchableHighlight, SafeAreaView} from 'react-native';

import ViewModel from './store/ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewS = ({viewModel}: Props) => (
  <SafeAreaView>
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{viewModel.countLabel}</Text>
      <TouchableHighlight onPress={viewModel.onClick}>
        <Text>Click me</Text>
      </TouchableHighlight>
    </View>
  </SafeAreaView>
);

export default observer(ViewS);
