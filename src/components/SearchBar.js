import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { Searchbar } from "react-native-paper";

const SearchBar = () => {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = React.useState("");

  const onChange = (query) => setSearch(query);

  console.log(focus);
  return (
    <View style={style.content}>
      <Searchbar
        style={style.search}
        placeholder="Pesquisar..."
        onChangeText={onChange}
        value={search}
        selectionColor={"#225E77"}
        // onFocus={() => setFocus(true)}
        // onBlur={() => setFocus(false)}
      />
    </View>
  );
};

export default SearchBar;

const style = StyleSheet.create({
  content: {
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: '#1E7596',
    // backgroundColor: 'blue',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    borderRadius: 30,
    width: "90%",
    height: 35,
  },
});
