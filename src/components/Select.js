import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Select = (props) => {

  const [selectedValue, setSelectedValue] = useState();

  const label = props.label;
  // console.log("select: ", props.valueDefault);

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

  

  const functionSelected = () => {
    if (props.valueDefault != "" && props.valueDefault != undefined) {
      return props.data
        .filter((item) => item.sigla === props.valueDefault)
        .map((item) => (
          <Picker.Item
            color="black"
            key={item.sigla}
            label={item.estado}
            value={item}
          />
        ));
    } else {
      return (
        <Picker.Item
          color="#7C7C7C"
          key={undefined}
          label={props.label}
          value={undefined}
        />
      );
    }
  };

  
  useEffect(()=> {
    functionSelected()

  }, [props.valueDefault])
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
          <Picker.Item
            color="black"
            label={item.estado}
            key={item.sigla}
            value={item}
          />
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
  },
});
