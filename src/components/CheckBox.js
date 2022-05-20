import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const CheckboxComponent = ({
  data,
  type,
  text,
  idCheckbox,
  stateCheckbox
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  const [dataCheckbox, setDataCheckbox] = useState((data.map((item) => item.id)));
  const [idChecked, setIdChecked] = useState([]);

  const handleOnChange = (position, id) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    idCheckbox(dataCheckbox)
    stateCheckbox(updatedCheckedState)
  }


const arrayFinal = () => {
  for(let i = 0 ; i < checkedState.length ; i++ ){
    if(checkedState[i]){
     const result = [...idChecked, dataCheckbox[i]]
     setIdChecked(result)
    }
  }
}
   

 

  

  

  //console.log('valores id: ', new Set(dataCheckbox));
  
 // console.log('state : ',checkedState);

  let textTitle = text;

  const render = () => {
    if (type == "Deficiencia") {
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
