import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { Searchbar } from "react-native-paper";
import Filter from "./Filter";

const SearchBar = ({ onChangeText, functionClicked }) => {
  const [search, setSearch] = useState("");
  const onChange = (query) => {
    setSearch(query);
    onChangeText(query);
  };

  // const keyPress = ({ nativeEvent: { key: keyValue } }) => {
  //   // console.log(keyValue);
  //   if(keyValue === 'Enter')
  //   {
  //     console.log("enter");
  //   }
  // }

  return (
    <View style={style.content}>
      <View style={style.contentView}>
        <Searchbar
          style={style.search}
          placeholder="Pesquisar..."
          onChangeText={onChange}
          value={search}
          selectionColor={"#225E77"}
          onIconPress={functionClicked}
          // onKeyPress={keyPress}
        />
        <View style={style.divisor}></View>
        <Filter />
      </View>
    </View>
  );
};

export default SearchBar;

const style = StyleSheet.create({
  content: {
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#1E7596",
    // backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  contentView: {
    paddingRight: 10,
    borderRadius: 10,
    height: 40,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  search: {
    borderRadius: 20,
    borderColor: "white",
    elevation: 0,
    width: "86%",
    height: 40,
  },
  divisor:{
    marginRight: 5,
    height: 25,
    width: 1.5,
    backgroundColor: '#225E77',
  }
});
