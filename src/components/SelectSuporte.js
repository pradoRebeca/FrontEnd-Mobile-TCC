import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectSuporte = ({ data, nameKey, onChange}) => {
  const [selectedValue, setSelectedValue] = useState();

  console.log(data);

  let selectDefault;

  switch (nameKey) {
    case "nome":
      selectDefault = "Selecione um Estado";
      break;

    case "tipo":
      selectDefault = "Selecione uma Deficencia";
      break;

      case "deficiencia":
      selectDefault = "Selecione uma deficiencia"
      break;
  }

  return (
    <View style={style.content}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={{ height: 40 }}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
      >
        <Picker.Item color="black" label={selectDefault} value={undefined} />

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
