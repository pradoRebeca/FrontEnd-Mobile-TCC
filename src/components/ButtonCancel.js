import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ButtonCancel = ({ title, functionClicked }) => {
  return (
    <TouchableOpacity style={style.content} onPress={functionClicked}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCancel;

const style = StyleSheet.create({
  content: {
    maxWidth: 250,
   
    // backgroundColor: "blue",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  //   text:{

  //   }
});
