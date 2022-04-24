import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Dimensions } from "react-native";

import ButtonComponent from "../components/Button";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={style.content}>
     <StatusBar backgroundColor='#DCEBF2'/>
        <Image style={style.image} source={require("../img/logo.png")} />
        <Text style={style.text}>
          orem Ipsum is simply dummy text of the printing and typesetting
         
        </Text>
        <View style={style.viewButton}>
          <ButtonComponent
            title="Entrar"
            backgroundColor="#225E77"
            color="#FFFFFF"
            navigation={navigation}
            screen="Login"
          />
          <ButtonComponent
            title="Cadastrar"
            backgroundColor="#E7E7E7"
            color="#6D6D6D"
            navigation={navigation}
            screen="Register"
          />
        </View>
     
    </SafeAreaView>
  );
};

export default Home;

const style = StyleSheet.create({
  image: {
    maxHeight: '40%',
    width: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: "center",
    maxHeight: '20%',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontSize: 20,
    marginBottom: 50,
  },
  viewButton: {
    maxHeight: '40%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
