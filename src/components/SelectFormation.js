import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectFormation = (props) => {
  const [selectedValue, setSelectedValue] = useState();

  var data = props.data ?? [];
  var labelInicial;
  var label;
  var value;

  switch (props.type) {
    case "curso":
      labelInicial = 'Selecione um Curso'
      label = "curso";
      value = "id";
      break;

    case "nivel":
      labelInicial = 'Selecione um Nível Academico'
      label = "nivel";
      value = "id";
      break;

    case "areaAtuacao":
      labelInicial = 'Selecione uma Área de Atuação'
      label = "areaAtuacao";
      value = "id";
      break;

    case "estado":
      labelInicial = 'Selecione um Estado'
      label = "estado";
      break;
  }


  const onChangeText = (element) => {
    setSelectedValue(element);
    props.onChangeObject({ ...props.object, [props.keyObject]: element });
  };

  const functionSelected = () => {
    if (props.edit) {
      return data
        .filter((item) => item.id === props.valueDefult)
        .map((item) => <Picker.Item  color='black' label={item[label]} value={item[value]} />);
    } else {
      return <Picker.Item color="#7C7C7C" label={labelInicial} value={undefined}/>
    }
  };
  
  return (
    <View style={{ backgroundColor: "#F5F5F5", marginBottom: 10 }}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={style.container}
        onValueChange={(itemValue, itemIndex) => onChangeText(itemValue)}
      >
        {functionSelected()}
        {data.map((item) => (
          <Picker.Item color='black' key={item[value]} label={item[label]} value={item[value]} />
        ))}
      </Picker>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
});

export default SelectFormation;
