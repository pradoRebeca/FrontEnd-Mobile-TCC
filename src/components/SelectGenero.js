import React, { useState, useEffect } from "react";
import { Picker, StyleSheet, View } from "react-native";

const SelectGenero = () => {
  const [genero, setGenero] = useState();

  const dataGenero = ["MASCULINO, FEMININO, PREFIRO NÃO INFORMAR"];

  return (
    <View style={style.content}>
      <Picker
      mode="dropdown"
      style={{height: 40}}
        selectedValue={genero}
        onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
      >
        <Picker.Item color="#7C7C7C"label="Selecione o seu gênero" value={undefined} />
        <Picker.Item label="Maculino" value="1" />
        <Picker.Item label="Feminino" value="2" />
        <Picker.Item label="Prefiro não informar" value="2" />
      </Picker>
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
  },
});

export default SelectGenero;
