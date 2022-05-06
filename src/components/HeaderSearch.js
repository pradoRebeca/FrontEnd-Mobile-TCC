import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderSearch = () => {
    const navigation = useNavigation();

    return (
    <View style={style.content}>
      <View style={style.viewImage}>
        <Image style={style.image} source={require("../img/logoMenor.png")} />
      </View>

      <FontAwesome name="search" size={20} color='#fff' onPress={() => navigation.navigate('Pesquisar')}/>
      
    </View>
  );
};

export default HeaderSearch;

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
  viewImage: {
      marginLeft: 5,
    height: 40,
    width: 40,
    // backgroundColor: "yellow",
  },
  image:{
      width: '100%',
      height: '100%',
  },
});
