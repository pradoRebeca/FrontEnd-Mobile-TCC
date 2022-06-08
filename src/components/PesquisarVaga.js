import React, { useState } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

const PesquisarVaga = ({ onChange }) => {
  return (
    <View style={style.content}>
      <Image style={style.image} source={require("../img/Search.png")} />
      <Text style={style.text}>Pesquisar vaga!</Text>
    </View>
  );
};

export default PesquisarVaga;

const style = StyleSheet.create({
  content: {
    marginTop: 20,
    width: 250,
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    // backgroundColor: 'red',
    width: "100%",
    height: 220,
  },
  text: {
    fontSize: 20,
    color: "#6D6D6D",
  },
});
