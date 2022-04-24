import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ModifyTitle = ({ title }) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

export default ModifyTitle;

const style = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 0,
    flexBasis: 'auto',
    padding: 10,
    display: "flex",
    justifyContent:"center",
    paddingLeft: 30,
    backgroundColor: "#DCEBF2",
  },
  title: {
    fontSize: 16,
    color: "#2795D2",
  },
});
