import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const ButtonHome = ({ text, functionClicked }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        functionClicked();
      }}
      accessible={true}
      accessibilityHint="Ir para a tela de Cadastro"
      accessibilityLabel="Cadastrar"
      style={style.viewButton}
    >
      <View>
        <Text style={{ ...style.titleButton, color: "#FFFFFF" }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonHome;

const style = StyleSheet.create({
  viewButton: {
    height: 40,
    width: '100%',
    backgroundColor: "#225E77",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 30,
  },
  titleButton: {
    color: "white",
    // fontSize: 24,
   
    fontWeight: "500",
  },
});
