import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TitleScreen = ({ title, descreption }) => {
  return (
    <View style={style.content}>
      <Text style={style.titleScreen}>{title}</Text>
      {descreption && <Text style={style.descreption}> {descreption}</Text>}
    </View>
  );
};

export default TitleScreen;

const style = StyleSheet.create({
  content: {
    // marginTop: 20,
    minHeight: 10,
    // backgroundColor: "blue",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginBottom: 20,
  
  },
  titleScreen: {
    width: "100%",
    textAlign: "center",
    color: "#225E77",
    fontSize: 20,
    fontWeight: "bold",

  },
  descreption: {
    marginTop: 20,
    backgroundColor: 'yellow',
    textAlign: "center",
  },
});
