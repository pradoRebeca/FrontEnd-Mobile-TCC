import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonSave = ({ disabled, functionClicked, mode }) => {
  const navigation = useNavigation();

  // function alertDisabled() {
  //   if (!disabled) {
  //     alert("dados slavos");
  //   }

  let label = "Salvar";
  let accessibilityLabel = "Salvar";
  let accessibilityHint = "Salvar informações";

  switch (mode) {
    case "filter":
      label = "Filtar";
      accessibilityLabel = "Filtrar";
      accessibilityHint = "Pesquisar por filtro";
      break;
  }

  const onClick = () => {
    console.log("buttonSave foi clicado");
    if (functionClicked()) {
      alert("dados enviados com sucesso");
      navigation.goBack();
    } else {
      alert("campos invalidos");
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => functionClicked()}
        accessible={true}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        style={style.button}
      >
        <Text style={style.text}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonSave;

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    height: 40,
    width: "100%",
    backgroundColor: "#1E7596",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
