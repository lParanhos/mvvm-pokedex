import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import ViewModel from '../ViewModel/PokemonListViewModel';
import {Card} from './components/Card';
import Pokeball from './../../../assets/poke_Ball_icon.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

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
      {viewModel.isLoading ? (
        <Text>Loading ....</Text>
      ) : (
        <>
          <FlatList
            onEndReached={viewModel.fetchMore}
            data={viewModel.pokemons}
            style={{width: '100%'}}
            keyExtractor={pkm => String(pkm.id)}
            renderItem={({item}) => {
              return <Card pokemon={item} />;
            }}
            ListFooterComponent={() => <Loader />}
          />
        </>
      )}
    </View>
  </SafeAreaView>
);

export default observer(ViewS);

const Loader = () => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      rotation.value = withSequence(
        withTiming(-10, {duration: 50}),
        withRepeat(withTiming(90, {duration: 100}), 6, true),
        withTiming(0, {duration: 50}),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [rotation]);
  return (
    <Animated.View style={[{alignItems: 'center'}, animatedStyles]}>
      <Pokeball width={120} height={120} fill="black" />
    </Animated.View>
  );
};
