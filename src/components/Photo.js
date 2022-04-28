import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar } from "react-native-paper";

const Photo = ({ navigation }) => {
  const [search, setSearch] = React.useState("");

  const onChange = (query) => setSearch(query);

  return (
    <View style={style.content}>
      <View style={style.viewImage}>
        <Image style={style.image} source={require("../img/logoMenor.png")} />
      </View>

      <Avatar.Image
        size={40}
        source={{
          uri: "https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png",
        }}
      />
    </View>
  );
};

export default Photo;

const style = StyleSheet.create({
  content: {
    top: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: '#1E7596',
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    borderRadius: 30,
    width: "100%",
    height: 35,
  },
  viewImage: {
    height: 40,
    width: 50,
    // backgroundColor: "yellow",
  },
  image:{
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
  }
});
