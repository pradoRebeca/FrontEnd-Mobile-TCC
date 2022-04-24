import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';

import { Searchbar } from 'react-native-paper';

const SearchBar = ({navigation}) => {
    const [search, setSearch] = React.useState('');

    const onChange= query => setSearch(query);

  return (
    <View style={style.content}>
      <Searchbar
      style={style.search}
      placeholder="Pesquisar..."
      onChangeText={onChange}
      value={search}
    />
    </View>
  );
}

export default SearchBar;

const style = StyleSheet.create({
  content: {
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#1E7596', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  search: {
    borderRadius: 30,
    width: '85%',
    height: 35,
  },
})