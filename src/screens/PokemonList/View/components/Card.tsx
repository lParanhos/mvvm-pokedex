import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

import {IPokemon} from '../../../../Models/pokemon';
import {getColorByType} from '../../../../utils/getColorByType';
import {getIconByType} from '../../../../utils/typeIcons';

interface IPokemonCard {
  pokemon: IPokemon;
}

export const Card: React.FC<IPokemonCard> = ({pokemon}) => {
  const {backgroundTypeColor} = getColorByType(pokemon.types[0].type.name);

  const styles = createStyleSheet({containerBackground: backgroundTypeColor});
  const makeId =
    pokemon.id < 10
      ? '00' + pokemon.id
      : pokemon.id < 100
      ? '0' + pokemon.id
      : pokemon.id;

  return (
    <Animated.View style={styles.container} entering={FadeIn.delay(200)}>
      <Image
        source={{uri: pokemon.sprites.other['official-artwork'].front_default}}
        resizeMode="contain"
        style={styles.pokemonImage}
      />
      <View style={{marginTop: 8}}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          {pokemon.types.map((type, index) => {
            const icon = getIconByType(type.type.name);
            return (
              <View
                key={index}
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: getColorByType(type.type.name).typeColor,
                  marginRight: 8,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {icon}
              </View>
            );
          })}
        </View>
      </View>
      <Text style={styles.pokemonId}>#{makeId}</Text>
    </Animated.View>
  );
};

interface StylesProps {
  containerBackground: string;
}

const createStyleSheet = ({containerBackground}: StylesProps) => {
  const styles = StyleSheet.create({
    container: {
      height: 100,
      backgroundColor: containerBackground,
      flexDirection: 'row',
      margin: 8,
      borderRadius: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    pokemonImage: {
      width: 100,
      height: 100,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF',
      textTransform: 'capitalize',
      alignSelf: 'center',
    },
    pokemonId: {
      fontSize: 40,
      fontWeight: 'bold',
      position: 'absolute',
      right: 4,
      bottom: -10,
      color: '#FFF',
      opacity: 0.65,
    },
  });

  return styles;
};
