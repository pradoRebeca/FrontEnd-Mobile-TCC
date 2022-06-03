import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectSuporte = ({ data, nameKey, onChange, disabled }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [enable, setEnable] = useState(disabled);

  console.log(data);

  let selectDefault;

  switch (nameKey) {
    case "sigla":
      selectDefault = "Selecione o Estado";
      break;

    case "tipo":
      selectDefault = "Selecione a Deficencia";
      break;

    case "deficiencia":
      selectDefault = "Selecione a deficiencia";
      break;

    case "valor":
      selectDefault = "Selecione o Salário";
      break;

    case "cidade":
      selectDefault = "Selecione a Cidade";
      break;

    case "nome":
      selectDefault = "Selecione o tipo de Suporte";
      break;
  }

  return (
    <View style={style.content}>
      <Picker
        enabled={enable}
        mode="dropdown"
        selectedValue={selectedValue}
        style={{ height: 40 }}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
      >
        <Picker.Item color="#7C7C7C" label={selectDefault} value={undefined} />

        {data.map((item) => (
          <Picker.Item
            color="black"
            key={item.id}
            label={item[nameKey]}
            value={item.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
  },
});

export default SelectSuporte;
