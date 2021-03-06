import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const CheckboxComponent = ({ data, type, text, idSelecionados }) => {
  const [checkedState, setCheckedState] = useState(
    data.map((item) => ({ ...item, status: false }))
  );

  const handleOnChange = (position, status) => {
    const updatedCheckedState = checkedState.map((item) =>
      item.id == position ? { ...item, status: !status } : { ...item }
    );

    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    const checked = checkedState
      .filter((item) => item.status == true)
      .map((item) => item.id);
    idSelecionados(checked);
  }, [checkedState]);

  let textTitle = text;

  const render = () => {
    if (type == "Deficiencia") {
      return checkedState.map((item) => {
        return (
          <Checkbox.Item
            key={item.id}
            labelStyle={style.item}
            style={style.item}
            color="#1E7596"
            label={item.tipo ?? item.deficiencia}
            value={item.id}
            status={item.status ? "checked" : "unchecked"}
            onPress={() => {
              handleOnChange(item.id, item.status);
            }}
          />
        );
      });
    } else {
      return data.map(({ id, tipo }, index) => {
        return (
          <Checkbox.Item
            key={id}
            labelStyle={style.item}
            style={style.item}
            color="#1E7596"
            label={tipo}
            value={id}
            status={checkedState[index] ? "checked" : "unchecked"}
            onPress={() => {
              handleOnChange(index);
            }}
          />
        );
      });
    }
  };

  return (
    <View style={style.container}>
      {textTitle && <Text style={style.title}>{textTitle}</Text>}
      {render()}
    </View>
  );
};

export default CheckboxComponent;

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    paddingLeft: 15,
    // borderBottomColor: '#F0F0F0',
    // borderBottomWidth: 2,
    // backgroundColor: "white",
    width: "100%",
    fontSize: 17,
  },
  item: {
    textTransform: "capitalize",
    // backgroundColor: 'yellow',
    fontSize: 15,
  },
});
