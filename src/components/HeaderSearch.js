import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const HeaderSearch = () => {
    const navigation = useNavigation();

    return (
   
      <View style={style.viewImage}>
        <Image style={style.image} source={require("../img/logoMenor.png")} />
        <Image style={style.imageLetra} source={require("../img/logoLetra.png")} />
      </View>
  
  );
};

export default HeaderSearch;

const style = StyleSheet.create({
  // content: {
   
  //   width: "100%",
  //   height: "100%",
  //   // backgroundColor: '#1E7596',
  //   backgroundColor: "blue",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  viewImage: {
    height: '100%',
    width: '100%',
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    resizeMode: 'contain',
      width: 35,
      height: 40,
// backgroundColor: 'red',
    },
  imageLetra:{
    // backgroundColor: 'pink',
    resizeMode: 'contain',
    width: 150,
    height: 30,
  },
});
