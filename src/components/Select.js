import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet } from "react-native";

const Select = (props) => {
  const [selectedValue, setSelectedValue] = useState();

  const functionSelected = () => {
    if (props.valueDefault != undefined) {
      return props.data
        .filter((item) => item.sigla === props.valueDefault)
        .map((item) => <Picker.Item label={item.estado} value={item} />);
    } else {
      return <Picker.Item label={"Selecione um estado"} value={undefined} />;
    }
  };

  const onChange = (obj) => {
    console.log(obj);
    if (obj != null) {
      setSelectedValue(obj);
      props.onChangeObject({
        ...props.object,
        sigla: obj.sigla,
        estado: obj.estado,
      });
    }
  };

  return (
    <View style={{ backgroundColor: "#F5F5F5", marginBottom: 10 }}>
      <Picker
        style={style.container}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={(text) => onChange(text)}
      >
        {functionSelected()}
        {props.data.map((item) => (
          <Picker.Item label={item.estado} value={item} />
        ))}
      </Picker>
    </View>
  );
};

export default Select;

const style = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    backgroundColor: "#F5F5F5",
    color: "#7C7C7C",
  },
});
