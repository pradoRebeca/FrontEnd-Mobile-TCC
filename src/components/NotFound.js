import React, { useState } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

const NotFound = ({ onChange }) => {
  return (
    <View style={style.content}>
      <Image style={style.image} source={require("../img/notFound.png")} />
      <Text style={style.text}>Não encontrado!</Text>
    </View>
  );
};

export default NotFound;

const style = StyleSheet.create({
  content: {
    width: 250,
    height: 250,
    display: "flex",
    //backgroundColor: "blue",
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
